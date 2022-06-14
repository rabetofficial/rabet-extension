import React from 'react';
import { DateTime } from 'luxon';
import { useNavigate } from 'react-router-dom';

import Infinity from 'popup/svgs/Infinity';
import timeout from 'popup/utils/timeout';
import shorter from 'popup/utils/shorter';
import RouteName from 'popup/staticRes/routes';
import FilledCopy from 'popup/svgs/FilledCopy';
import Card from 'popup/components/common/Card';
import xlmLogo from 'assets/images/xlm-logo.svg';
import Image from 'popup/components/common/Image';
import humanizeAmount from 'helpers/humanizeAmount';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import ShortRightArrow from 'popup/svgs/ShortRightArrow';
import questionLogo from 'assets/images/question-circle.png';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';
import claimClaimableBalanceAction from 'popup/actions/operations/claimClaimableBalance';
import {
  predicateFromHorizonResponse,
  getPredicateInformation,
  PredicateInformation,
} from 'popup/utils/stellarResolveClaimantPredicates';
import Tooltips from 'popup/components/common/Tooltips';

import * as S from './styles';

type ClaimableStatus = 'claimable' | 'upcoming' | 'expired';

type ButtonComponentProps = {
  status: ClaimableStatus;
  onClick: () => void;
  predicateInfo: PredicateInformation;
};

type ClaimableBalancesType = {
  claimableData: ClaimableBalanceWithAssetImage;
};

type PeriodProps = {
  createdAt: string;
  predicate: PredicateInformation;
};

const ButtonComponent = ({
  status,
  onClick,
  predicateInfo,
}: ButtonComponentProps) => {
  if (status === 'upcoming') {
    const now = DateTime.now();
    const then = DateTime.fromSeconds(predicateInfo.validFrom);

    const diff = then.diff(now, ['days', 'hours', 'minutes']);

    let message: string = '';

    if (diff.values.days) {
      message += `${diff.values.days.toFixed(0)} Days `;
    }

    if (diff.values.hours) {
      message += `${diff.values.hours.toFixed(0)} Hours `;
    }

    if (diff.values.minutes) {
      if (diff.values.minutes < 1) {
        message += `less than 1 Min `;
      } else {
        message += `${diff.values.minutes.toFixed(0)} Min `;
      }
    }

    return (
      <S.Note>
        <S.Text>Claimable in {message}</S.Text>
      </S.Note>
    );
  }

  return (
    <ButtonContainer btnSize={90} justify="end" mt={24}>
      <Button
        style={
          status === 'expired'
            ? {
                backgroundColor: '#fff4f4',
                border: '1px solid #fff4f4',
                borderRadius: '3px',
                color: '#ce3d3d',
              }
            : {}
        }
        variant={status === 'expired' ? 'danger' : 'primary'}
        content={status === 'expired' ? 'Expired' : 'Claim'}
        size="medium"
        disabled={status === 'expired'}
        onClick={onClick}
      />
    </ButtonContainer>
  );
};

const Period = ({ predicate, createdAt }: PeriodProps) => {
  let element: JSX.Element;

  const validFromText = () => {
    element = (
      <S.Info>
        <p>
          {DateTime.fromSeconds(predicate.validFrom).toFormat(
            'MMM dd yyyy',
          )}
        </p>
        <span className="m-2.5">
          <ShortRightArrow />
        </span>
        <Tooltips
          text="Infinite"
          placement="top"
          isVisible
          controlled
        >
          <Infinity />
        </Tooltips>
      </S.Info>
    );
  };

  const validUntilText = (isFinite: boolean) => {
    element = (
      <S.Info>
        <span>
          {DateTime.fromJSDate(new Date(createdAt)).toFormat(
            'MMM dd yyyy',
          )}

          <span className="m-2.5">
            <ShortRightArrow />
          </span>

          {isFinite ? (
            <>
              {DateTime.fromSeconds(predicate.validTo).toFormat(
                'MMM dd yyyy',
              )}
            </>
          ) : (
            <Tooltips
              text="Infinite"
              placement="top"
              isVisible
              controlled
            >
              <Infinity />
            </Tooltips>
          )}
        </span>
      </S.Info>
    );
  };

  if (!predicate.validTo && !predicate.validFrom) {
    validUntilText(false);
  } else if (!predicate.validTo && predicate.validFrom) {
    validFromText();
  } else if (predicate.validTo && !predicate.validFrom) {
    validUntilText(true);
  } else {
    element = (
      <S.Info>
        {DateTime.fromSeconds(predicate.validFrom).toFormat(
          'MMM dd yyyy',
        )}

        <span className="m-2.5">
          <ShortRightArrow />
        </span>

        {DateTime.fromSeconds(predicate.validTo).toFormat(
          'MMM dd yyyy',
        )}
      </S.Info>
    );
  }

  return (
    <div className="mt-4">
      <S.InfoTitle>Period</S.InfoTitle>
      {element}
    </div>
  );
};

const ClaimableBalances = ({
  claimableData,
}: ClaimableBalancesType) => {
  const navigate = useNavigate();
  const activeAccount = useActiveAccount();

  const foundClaimant = claimableData.claimants.find(
    (claimant) => claimant.destination === activeAccount.publicKey,
  );

  let predicateInformation: PredicateInformation;

  if (!foundClaimant) {
    predicateInformation = {
      status: 'upcoming',
      validFrom: 1685976895967,
      validTo: 1685986895967,
    };
  } else {
    const canClaim = predicateFromHorizonResponse(
      foundClaimant.predicate,
    );

    predicateInformation = getPredicateInformation(
      canClaim,
      new Date(),
    );
  }

  const [assetCode, assetIssuer] = claimableData.asset.split(':');
  let showAssetCode = assetCode;
  let showAssetLogo = claimableData.logo;

  if (assetCode === 'native' && !assetIssuer) {
    showAssetCode = 'XLM';
    showAssetLogo = xlmLogo;
  }

  if (predicateInformation.validFrom) {
    const now = DateTime.now();
    const then = DateTime.fromSeconds(predicateInformation.validFrom);

    const diff = then.diff(now, ['days', 'hours', 'minutes']);

    if (diff.days > 10_000_000) {
      return <span />;
    }
  }

  const handleSubmit = async () => {
    navigate(RouteName.LoadingNetwork);

    const [isSuccessful, message] = await claimClaimableBalanceAction(
      claimableData,
    );

    await timeout(100);

    if (isSuccessful) {
      navigate(RouteName.Sucess, {
        state: {
          message,
        },
      });
    } else {
      navigate(RouteName.Error, {
        state: {
          message,
        },
      });
    }
  };

  return (
    <div className="mt-5">
      <Card type="secondary" className="my-4 py-4 px-[11px]">
        <div>
          <S.InfoTitle>Amount</S.InfoTitle>
          <div className="inline-flex items-center">
            <S.Info>
              {humanizeAmount(
                parseFloat(claimableData.amount).toString(),
              )}
            </S.Info>
            <S.Type>
              <div className="mr-[2px]">
                <Image
                  src={showAssetLogo}
                  alt="L"
                  style={{ width: 18, height: 18 }}
                  fallBack={questionLogo}
                />
              </div>

              {showAssetCode}
            </S.Type>
          </div>
        </div>

        <Period
          predicate={predicateInformation}
          createdAt={claimableData.last_modified_time}
        />

        <div className="mt-4">
          <S.InfoTitle>Sponsor</S.InfoTitle>
          <CopyText
            text={claimableData.sponsor}
            custom={
              <span className="text-[18px] inline-flex items-center gap-1">
                <p>
                  {activeAccount.publicKey === claimableData.sponsor
                    ? 'Me'
                    : shorter(claimableData.sponsor, 6)}
                </p>
                <FilledCopy />
              </span>
            }
          />
        </div>
        <ButtonComponent
          status={predicateInformation.status}
          onClick={handleSubmit}
          predicateInfo={predicateInformation}
        />
      </Card>
    </div>
  );
};
export default ClaimableBalances;
