import React from 'react';

import Card from 'popup/components/common/Card';
import Button from 'popup/components/common/Button';
import SelectOption from 'popup/components/common/SelectOption';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import ShortRightArrow from 'popup/svgs/ShortRightArrow';

import * as S from './styles';

type ClaimableBalancesType = {
  amount: number;
  assetImg: string;
  assetType: string;
  fromDate: string;
  toDate: string;
  sponsorId: string;
};
const ClaimableBalances = ({
  amount,
  assetImg,
  assetType,
  fromDate,
  toDate,
  sponsorId,
}: ClaimableBalancesType) => {
  const onChange = () => {
    console.log('hey');
  };

  const modes = ['All', 'Claimable', 'early', 'Expired'];

  const handleTypes = () => {
    if (Claimable) {
      return Claimable;
    }
    if (Expired) {
      return Expired;
    }
    return Early;
  };

  const Claimable = () => (
    <>
      <ButtonContainer btnSize={90} justify="end" mt={24}>
        <Button variant="primary" content="Claim" size="medium" />
      </ButtonContainer>
    </>
  );
  const Expired = () => (
    <>
      <ButtonContainer btnSize={90} justify="end" mt={24}>
        <Button
          style={{
            backgroundColor: '#fff4f4',
            border: '1px solid #fff4f4',
            borderRadius: '3px',
          }}
          variant="danger"
          content="Expired"
          size="medium"
        />
      </ButtonContainer>
    </>
  );
  const Early = () => (
    <>
      <S.Note>
        <S.Text>Will be claimable in 2 Days 3 Hours 30 Min</S.Text>
      </S.Note>
    </>
  );

  return (
    <div className="mt-5">
      <SelectOption
        defaultValue={modes[0]}
        variant="outlined"
        items={modes}
        onChange={onChange}
        isSearchable={false}
      />
      <Card type="secondary" className="my-4 py-4 px-[11px]">
        <div>
          <S.InfoTitle>Amount</S.InfoTitle>
          <div className="inline-flex items-center">
            <S.Info>{amount}</S.Info>
            <S.Type>
              <div className="mr-[2px]">{assetImg}</div>
              {assetType}
            </S.Type>
          </div>
        </div>
        <div className="mt-4">
          <S.InfoTitle>Period</S.InfoTitle>
          <S.Info>
            <p>{fromDate}</p>
            <span className="m-2.5">
              <ShortRightArrow />
            </span>
            <p>{toDate}</p>
          </S.Info>
        </div>
        <div className="mt-4">
          <S.InfoTitle>Sponsor</S.InfoTitle>
          <S.Info>{sponsorId}</S.Info>
        </div>
      </Card>
    </div>
  );
};
export default ClaimableBalances;
