import React from 'react';
import QR from 'qrcode.react';

import Card from 'popup/components/common/Card';
import CopyKey from 'popup/components/common/CopyKey';
import currentActiveAccount from '../../utils/activeAccount';

import * as S from './styles';

const QRCode = () => {
  const { activeAccount } = currentActiveAccount();
  const { publicKey } = activeAccount;

  return (
    <>
      <Card type="primary" className="pt-[11px] pb-[10px] pl-[12px]">
        <div className="flex">
          <QR value={publicKey} size={123} />
          <S.Scan>
            <S.ScanText>SCAN ME</S.ScanText>
          </S.Scan>
        </div>
      </Card>

      <div className="mt-6">
        <CopyKey keyValue={publicKey} />
      </div>
    </>
  );
};

export default QRCode;
