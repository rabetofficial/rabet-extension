import React from 'react';

import QRCode from 'popup/blocks/QRCode';
import openModalAction from 'popup/actions/modal/open';
import CopyText from 'popup/components/common/CopyText';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import EditWalletName from 'popup/components/EditWalletName';

import * as S from './styles';

const AddressBlock = () => {
  const { publicKey } = useActiveAccount();

  const onOpenModal = () => {
    openModalAction({
      minHeight: 0,
      isStyled: true,
      size: 'medium',
      title: 'Receive',
      padding: 'large',
      children: <QRCode />,
    });
  };

  return (
    <S.Card className="rounded pt-[22px] pb-[18px]">
      <EditWalletName height={34} checkIconWidth={18} fontSize={14} />

      <div className="text-3xl font-medium mt-[15px]">$0</div>

      <div className="flex justify-between items-center mt-[18px]">
        <div className="text-base font-medium">Your Address</div>

        <S.QrTrigger onClick={onOpenModal}>QR-code</S.QrTrigger>
      </div>

      <S.AddressBox>
        <CopyText
          text={publicKey}
          custom={<S.Address>{publicKey}</S.Address>}
        />
      </S.AddressBox>
    </S.Card>
  );
};

export default AddressBlock;
