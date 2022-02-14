import React from 'react';
import QR from 'qrcode.react';
import CopyText from '../../components/CopyText';
import Card from '../../components/common/Card';
import currentActiveAccount from '../../utils/activeAccount';

import * as S from './styles';

const QRCode = () => {
  const { activeAccount } = currentActiveAccount();
  const { publicKey } = activeAccount;

  return (
    <div>
      <Card type="primary" className="pt-[11px] pb-[10px] pl-[12px]">
        <div className="flex">
          <QR value={publicKey} size={123} />
          <S.Scan>
            <S.ScanText>SCAN ME</S.ScanText>
          </S.Scan>
        </div>
      </Card>

      <Card type="primary" className="p-2">
        <S.Key>
          {publicKey}{' '}
          <S.Copy>
            <CopyText copyButton text={publicKey} />
          </S.Copy>
        </S.Key>
      </Card>
    </div>
  );
};

export default QRCode;
