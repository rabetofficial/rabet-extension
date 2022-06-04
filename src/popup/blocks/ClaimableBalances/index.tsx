import React, { useState } from 'react';

import shorter from 'popup/utils/shorter';
import FilledCopy from 'popup/svgs/FilledCopy';
import Card from 'popup/components/common/Card';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import SelectOption from 'popup/components/common/SelectOption';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import ShortRightArrow from 'popup/svgs/ShortRightArrow';

import * as S from './styles';

type ClaimableStatus = 'claimable' | 'early' | 'expired';

type ButtonComponentProps = {
  status: ClaimableStatus;
  onClick: () => void;
};

type ClaimableBalancesType = {
  amount: number;
  assetImg: string;
  assetCode: string;
  fromDate: string;
  toDate: string;
  sponsorId: string;
  status: ClaimableStatus;
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
  amount,
  assetImg,
  assetCode,
  fromDate,
  toDate,
  sponsorId,
  status,
}: ClaimableBalancesType) => {
  const [selected, setSelected] = useState({
    value: 'all',
    label: 'All',
  });

  const onChange = (e) => {
    setSelected(e);
  };

  const selectOptions = [
    { value: 'all', label: 'All' },
    { value: 'early', label: 'Early' },
    { value: 'expired', label: 'Expired' },
    { value: 'claimable', label: 'Claimable' },
  ];

  return (
    <div className="mt-5">
      <SelectOption
        defaultValue={selectOptions[0]}
        selected={selected}
        variant="outlined"
        items={selectOptions}
        onChange={onChange}
        isSearchable={false}
      />
      <Card type="secondary" className="my-4 py-4 px-[11px]">
        <div>
          <S.InfoTitle>Amount</S.InfoTitle>
          <div className="inline-flex items-center">
            <S.Info>{amount}</S.Info>
            <S.Type>
              <div className="mr-[2px]">
                <img
                  src={assetImg}
                  alt="logo"
                  width={18}
                  height={18}
                />
              </div>
              {assetCode}
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
          <CopyText
            text={sponsorId}
            custom={
              <span className="text-[18px] inline-flex items-center gap-1">
                <p>{shorter(sponsorId, 6)}</p>
                <FilledCopy />
              </span>
            }
          />
        </div>
        <ButtonComponent status={status} onClick={() => {}} />
      </Card>
    </div>
  );
};
export default ClaimableBalances;
