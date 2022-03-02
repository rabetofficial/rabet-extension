import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Card from 'popup/components/common/Card';
import shorter from 'popup/utils/shorter';
import CopyText from 'popup/components/common/CopyText';
import Confirm from 'popup/blocks/Operation/Basic/ConfirmLayout';
import handleAssetImage from 'popup/utils/handleAssetImage';
import numberWithCommas from 'popup/utils/numberWithCommas';
import basicSendAction from 'popup/actions/operations/basicSend';

import * as S from 'popup/blocks/Operation/Basic/ConfirmLayout/styles';

const BasicSendConfirm = () => {
  const navigate = useNavigate();
  const {
    state: { values },
  } = useLocation();

  const handleClick = () => {
    basicSendAction(values, navigate);
  };

  return (
    <Confirm handleClick={handleClick}>
      <Card type="secondary" className="px-[11px] py-[16px]">
        <h2 className="text-lg font-medium mb-4">Confirm Send</h2>
        <S.Label>Amount</S.Label>
        <S.Value>
          {numberWithCommas(values.amount)}
          <img
            src={handleAssetImage(values.asset)}
            alt={values.asset.asset_code}
          />
          <span>{values.asset.asset_code}</span>
        </S.Value>
        <S.Hr />
        <S.Label>To</S.Label>
        <S.Value>
          <CopyText
            text={values.destination}
            custom={shorter(values.destination, 4)}
          />
        </S.Value>
        <S.Hr />
        {values.memo ? (
          <>
            <S.Label>Memo</S.Label>
            <S.Hr>{values.memo}</S.Hr>
          </>
        ) : (
          ''
        )}
      </Card>
    </Confirm>
  );
};

export default BasicSendConfirm;
