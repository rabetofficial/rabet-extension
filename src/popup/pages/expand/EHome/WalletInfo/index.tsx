import React from 'react';
import styled from 'styled-components';

import EditWalletName from 'popup/components/EditWalletName';
import CopyKey from 'popup/components/common/CopyKey';
import Button from 'popup/components/common/Button';
import Trash from 'popup/svgs/Trash';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';

const Hr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  margin: 40px 0;
`;

const WalletInfo = () => (
  <InsideTabLayout>
    <div className="pb-[67px]">
      <div className="label-primary mb-[6px]">Wallet name</div>
      <EditWalletName height={48} checkIconWidth={22} fontSize={16} />

      <div className="label-primary mt-6 mb-[6px]">Private Key</div>
      <CopyKey keyValue="SRTAVASMW6S344SCW4DESZFEXTCTJPE5KTCFNLyU3ZFLNQZ4TC67SEFU" />

      <div className="label-primary mt-6 mb-[6px]">Address</div>
      <CopyKey keyValue="GCHERU56A55FBC647QTX2QNA5DD7IZURIYJNX24NCR2QUHDEMLXI2FK0" />

      <Hr />

      <Button
        variant="danger"
        content="Delete account"
        size="medium"
        startIcon={<Trash />}
      />
    </div>
  </InsideTabLayout>
);

export default WalletInfo;
