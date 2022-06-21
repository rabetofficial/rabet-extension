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
import {
  ClaimableBalanceDetailed,
  ClaimableBalanceWithAssetImage,
} from 'popup/api/getClaimableBalances';
import Tooltips from 'popup/components/common/Tooltips';
import claimClaimableBalanceAction from 'popup/actions/operations/claimClaimableBalance';

import * as S from './styles';

type ClaimableStatus = 'all' | 'claimable' | 'upcoming' | 'expired';

type ButtonComponentProps = {
  onClick: () => void;
  claimableData: ClaimableBalanceDetailed;
};

type ClaimableBalancesType = {
  claimableData: ClaimableBalanceDetailed;
};

type PeriodProps = {
  claimableData: ClaimableBalanceDetailed;
};

const ButtonComponent = ({
  onClick,
  claimableData,
}: ButtonComponentProps) => {
  if (claimableData.status.status === 'upcoming') {
    const now = DateTime.now();
    const then = DateTime.fromSeconds(claimableData.status.validFrom);

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
          claimableData.status.status === 'expired'
            ? {
                backgroundColor: '#fff4f4',
                border: '1px solid #fff4f4',
                borderRadius: '3px',
                color: '#ce3d3d',
              }
            : {}
        }
        variant={
          claimableData.status.status === 'expired'
            ? 'danger'
            : 'primary'
        }
        content={
          claimableData.status.status === 'expired'
            ? 'Expired'
            : 'Claim'
        }
        size="medium"
        disabled={claimableData.status.status === 'expired'}
        onClick={onClick}
      />
    </ButtonContainer>
  );
};

const Period = ({ claimableData }: PeriodProps) => {
  const activeAccount = useActiveAccount();

  let element: JSX.Element;

  const validFromText = (abs_before_epoch?: string) => {
    element = (
      <S.Info>
        <p>
          {DateTime.fromSeconds(
            claimableData.status.validFrom,
          ).toFormat('MMM dd yyyy')}
        </p>

        <div className="m-2.5">
          <ShortRightArrow />
        </div>

        {abs_before_epoch ? (
          <p>
            {DateTime.fromSeconds(
              parseInt(abs_before_epoch, 10),
            ).toFormat('MMM dd yyyy')}
          </p>
        ) : (
          <Tooltips text="Infinite" placement="top" controlled>
            <Infinity />
          </Tooltips>
        )}
      </S.Info>
    );
  };

  const validUntilText = (isFinite: boolean, abs_before?: string) => {
    element = (
      <S.Info>
        {abs_before
          ? DateTime.fromJSDate(new Date(abs_before)).toFormat(
              'MMM dd yyyy',
            )
          : DateTime.fromJSDate(
              new Date(claimableData.last_modified_time),
            ).toFormat('MMM dd yyyy')}

        <div className="m-2.5">
          <ShortRightArrow />
        </div>

        {isFinite ? (
          <>
            {DateTime.fromSeconds(
              claimableData.status.validTo,
            ).toFormat('MMM dd yyyy')}
          </>
        ) : (
          <Tooltips text="Infinite" placement="top" controlled>
            <Infinity />
          </Tooltips>
        )}
      </S.Info>
    );
  };

  const foundClaimant = claimableData.claimants.find(
    (x) => x.destination === activeAccount.publicKey,
  );

  if (
    !claimableData.status.validTo &&
    !claimableData.status.validFrom
  ) {
    validUntilText(false);
  } else if (
    !claimableData.status.validTo &&
    claimableData.status.validFrom
  ) {
    if (foundClaimant) {
      if (foundClaimant.predicate.and) {
        const foundPredicate = foundClaimant.predicate.and.find(
          (x) => x.abs_before,
        );

        if (foundPredicate) {
          validFromText(foundPredicate.abs_before_epoch);
        }
      } else {
        validFromText();
      }
    } else {
      validFromText();
    }
  } else if (
    claimableData.status.validTo &&
    !claimableData.status.validFrom
  ) {
    if (foundClaimant.predicate.and) {
      const foundAnd = foundClaimant.predicate.and.find((x) => x.not);

      if (foundAnd) {
        validUntilText(true, foundAnd.not.abs_before);
      } else {
        validUntilText(true);
      }
    } else {
      validUntilText(true);
    }
  } else {
    element = (
      <S.Info>
        {DateTime.fromSeconds(
          claimableData.status.validFrom,
        ).toFormat('MMM dd yyyy')}

        <div className="m-2.5">
          <ShortRightArrow />
        </div>

        {DateTime.fromSeconds(claimableData.status.validTo).toFormat(
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
                  src={claimableData.showAssetLogo}
                  alt="L"
                  style={{ width: 18, height: 18 }}
                  fallBack={questionLogo}
                />
              </div>

              {claimableData.showAssetCode}
            </S.Type>
          </div>
        </div>

        <Period claimableData={claimableData} />

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
          onClick={handleSubmit}
          claimableData={claimableData}
        />
      </Card>
    </div>
  );
};
export default ClaimableBalances;
