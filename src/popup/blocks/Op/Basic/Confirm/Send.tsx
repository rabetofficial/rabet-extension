import React from 'react';
import { useNavigate } from 'react-router-dom';

import Card from 'popup/components/common/Card';
import shorter from 'popup/utils/shorter';
import CopyText from 'popup/components/common/CopyText';
import numberWithCommas from 'popup/utils/numberWithCommas';
import basicSendAction from 'popup/actions/operations/basicSend';
import ConfirmLayout from './Layout';
import questionLogo from '../../../../../assets/images/question-circle.png';

import * as S from './styles';

const BasicConfirmSend = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    basicSendAction(values, navigate);
  };

  const values = {
    amount: '20',
    destination: 'GAMMfefedt6f6efVS3O',
    memo: 'ygusxuy',
    asset: {
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

  return (
    <ConfirmLayout handleClick={handleClick}>
      <Card type="secondary" className="px-[11px] py-[16px]">
        <h2 className="text-lg font-medium mb-4">Confirm Send</h2>
        <S.Label>Amount</S.Label>
        <S.Value>
          {numberWithCommas(values.amount)}
          <img src={questionLogo} alt={values.asset.asset_code} />
          <span>{values.asset.asset_code}</span>
        </S.Value>
        <S.Hr />
        <S.Label>To</S.Label>
        <CopyText
          text={values.destination}
          custom={<S.Value>{shorter(values.destination, 4)}</S.Value>}
        />
        <S.Hr />
        {values.memo ? (
          <>
            <S.Label>Memo</S.Label>
            <S.Value>{values.memo}</S.Value>
          </>
        ) : (
          ''
        )}
      </Card>
    </ConfirmLayout>
  );
};

export default BasicConfirmSend;
