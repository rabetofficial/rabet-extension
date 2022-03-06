import React from 'react';
import { useNavigate } from 'react-router-dom';

import numberWithCommas from 'popup/utils/numberWithCommas';
import Card from 'popup/components/common/Card';
import basicSwapAction from 'popup/actions/operations/basicSwap';
import ArrowDown from 'popup/svgs/ArrowDown';
import SwapDetail from 'popup/blocks/Op/Basic/Swap/Detail';
import ConfirmLayout from './Layout';
import questionLogo from '../../../../../assets/images/question-circle.png';

import * as S from './styles';

const BasicConfirmSwap = () => {
  const navigate = useNavigate();

  const values = {
    amount: '20',
    destination: 'GAMMfefedt6f6efVS3O',
    memo: 'ygusxuy',
    minimumReceived: 'test',
    from: '5',
    to: '8',
    path: [],
    asset1: {
      asset_code: 'XLM',
      asset_issuer: '123',
      last_modified_ledger: '234',
      limit: '567',
      is_authorized: false,
      is_authorized_to_maintain_liabilities: true,
      logo: '',
      domain: 'Stellar.org',
      toNative: 1,
    },
    asset2: {
      asset_code: 'XLM',
      asset_issuer: '123',
      last_modified_ledger: '234',
      limit: '567',
      is_authorized: false,
      is_authorized_to_maintain_liabilities: true,
      logo: '',
      domain: 'Stellar.org',
      toNative: 1,
    },
  };

  const handleClick = () => {
    basicSwapAction(values, navigate);
  };

  return (
    <ConfirmLayout handleClick={handleClick}>
      <Card type="secondary" className="px-[11px] py-[16px]">
        <h2 className="text-lg font-medium mb-4">Confirm Swap</h2>
        <S.Label>From</S.Label>
        <S.Value>
          {numberWithCommas(values.from)}
          <img src={questionLogo} alt={values.asset1.asset_code} />
          <span>{values.asset1.asset_code}</span>
        </S.Value>

        <div className="my-1">
          <ArrowDown />
        </div>

        <S.Label>To</S.Label>
        <S.Value>
          {numberWithCommas(values.to)}
          <img src={questionLogo} alt={values.asset2.asset_code} />
          <span>{values.asset2.asset_code}</span>
        </S.Value>

        <S.Hr />

        <SwapDetail
          values={values}
          path={values.path}
          asset1={values.asset1}
          asset2={values.asset2}
          received={{
            asset: values.asset2,
            minimumReceived: values.minimumReceived,
          }}
        />
      </Card>
    </ConfirmLayout>
  );
};

export default BasicConfirmSwap;
