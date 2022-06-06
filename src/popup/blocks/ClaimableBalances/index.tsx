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
};

type ClaimableBalancesType = {
  claimableData: ClaimableBalanceWithAssetImage;
};

const ButtonComponent = ({
  status,
  onClick,
}: ButtonComponentProps) => {
  if (status === 'upcoming') {
    return (
      <S.Note>
        <S.Text>Will be claimable in 2 Days 3 Hours 30 Min</S.Text>
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

  console.log(predicate.validFrom * 1000);

  /* {' '}
          <span className="m-2.5">
            <ShortRightArrow />
          </span>
          */

  return (
    <div className="mt-4">
      <S.InfoTitle>Period</S.InfoTitle>
      {!predicate.validTo && !predicate.validFrom && (
        <S.Info>Unconditional</S.Info>
      )}

      {!predicate.validTo && predicate.validFrom && (
        <S.Info>
          <p>
            Can be claimed from{' '}
            {DateTime.fromSeconds(predicate.validFrom).toFormat(
              'MMM dd yyyy',
            )}
          </p>
        </S.Info>
      )}

      {predicate.validTo && !predicate.validFrom && (
        <S.Info>
          <span>
            Can be claimed until{' '}
            {DateTime.fromSeconds(predicate.validTo).toFormat(
              'MMM dd yyyy',
            )}
          </span>
        </S.Info>
      )}
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
        />
      </Card>
    </div>
  );
};
export default ClaimableBalances;
