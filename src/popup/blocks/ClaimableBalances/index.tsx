import React from 'react';
import { DateTime } from 'luxon';

import shorter from 'popup/utils/shorter';
import FilledCopy from 'popup/svgs/FilledCopy';
import Card from 'popup/components/common/Card';
import Image from 'popup/components/common/Image';
import humanizeAmount from 'helpers/humanizeAmount';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import ShortRightArrow from 'popup/svgs/ShortRightArrow';
import questionLogo from 'assets/images/question-circle.png';
import xlmLogo from 'assets/images/xlm-logo.svg';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';
import {
  predicateFromHorizonResponse,
  getPredicateInformation,
  PredicateInformation,
} from 'popup/utils/stellarResolveClaimantPredicates';

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

const ButtonComponent = ({
  status,
  onClick,
  predicateInfo,
}: ButtonComponentProps) => {
  if (status === 'upcoming') {
    const now = DateTime.now();
    const then = DateTime.fromSeconds(predicateInfo.validFrom);

    const diff = then.diff(now, [
      'days',
      'hours',
      'minutes',
      'seconds',
    ]);

    let message: string = '';

    if (diff.values.days) {
      message += `${diff.values.days} Days `;
    }

    if (diff.values.hours) {
      message += `${diff.values.hours} Hours `;
    }

    if (diff.values.minutes) {
      message += `${diff.values.minutes} Minutes `;
    }

    if (diff.values.seconds) {
      message += `${diff.values.seconds} Seconds `;
    }

    return (
      <S.Note>
        <S.Text>Will be claimable in {message}</S.Text>
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

const Period = (predicateInfo: PredicateInformation) => {
  const { predicate } = predicateInfo;

  let element: JSX.Element;

  const validFromText = () => {
    element = (
      <S.Info>
        <p>
          Can be claimed from{' '}
          {DateTime.fromSeconds(predicate.validFrom).toFormat(
            'MMM dd yyyy',
          )}
        </p>
      </S.Info>
    );
  };

  const validUntilText = () => {
    element = (
      <S.Info>
        <span>
          Can be claimed until{' '}
          {DateTime.fromSeconds(predicate.validTo).toFormat(
            'MMM dd yyyy',
          )}
        </span>
      </S.Info>
    );
  };

  if (!predicate.validTo && !predicate.validFrom) {
    element = <S.Info>Unconditional</S.Info>;
  } else if (!predicate.validTo && predicate.validFrom) {
    validFromText();
  } else if (predicate.validTo && !predicate.validFrom) {
    validUntilText();
  } else {
    const isDuring = predicate.validFrom < predicate.validTo;

    if (isDuring) {
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
    } else {
      const now = Date.now();

      if (now < predicate.validTo * 1000) {
        validUntilText();
      } else {
        validFromText();
      }
    }
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

    const diff = then.diff(now, [
      'days',
      'hours',
      'minutes',
      'seconds',
    ]);

    if (diff.days > 10_000_000) {
      return '';
    }
  }

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

        <Period predicate={predicateInformation} />

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
          onClick={() => {}}
          predicateInfo={predicateInformation}
        />
      </Card>
    </div>
  );
};
export default ClaimableBalances;
