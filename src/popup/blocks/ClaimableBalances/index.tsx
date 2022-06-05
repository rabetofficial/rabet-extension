import React from 'react';

import shorter from 'popup/utils/shorter';
import FilledCopy from 'popup/svgs/FilledCopy';
import Card from 'popup/components/common/Card';
import Image from 'popup/components/common/Image';
import humanizeAmount from 'helpers/humanizeAmount';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import ShortRightArrow from 'popup/svgs/ShortRightArrow';
import questionLogo from 'assets/images/question-circle.png';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';

import * as S from './styles';

type ClaimableStatus = 'claimable' | 'early' | 'expired';

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
  if (status === 'early') {
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

const ClaimableBalances = ({
  claimableData,
}: ClaimableBalancesType) => (
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
                src={claimableData.logo}
                alt="L"
                style={{ width: 18, height: 18 }}
                fallBack={questionLogo}
              />
            </div>

            {claimableData.asset.split(':')[0]}
          </S.Type>
        </div>
      </div>
      <div className="mt-4">
        <S.InfoTitle>Period</S.InfoTitle>
        <S.Info>
          <p>20 Feb 2022</p>
          <span className="m-2.5">
            <ShortRightArrow />
          </span>
          <p>25 Dec 2022</p>
        </S.Info>
      </div>
      <div className="mt-4">
        <S.InfoTitle>Sponsor</S.InfoTitle>
        <CopyText
          text={claimableData.sponsor}
          custom={
            <span className="text-[18px] inline-flex items-center gap-1">
              <p>{shorter(claimableData.sponsor, 6)}</p>
              <FilledCopy />
            </span>
          }
        />
      </div>
      <ButtonComponent status="claimable" onClick={() => {}} />
    </Card>
  </div>
);
export default ClaimableBalances;
