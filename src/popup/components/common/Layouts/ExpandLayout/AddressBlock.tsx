import React, { useState } from 'react';

import EditWalletName from 'popup/components/EditWalletName';
import CopyText from 'popup/components/common/CopyText';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ModalDialog from 'popup/components/common/ModalDialog';
import QRCode from 'popup/Blocks/QRCode';

import * as S from './styles';

const AddressBlock = () => {
  const { publicKey } = useActiveAccount();
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);
  const [isEditable, setEditable] = useState(false);

  return (
    <S.Card className="pt-[22px] pb-[18px]">
      <EditWalletName
        isEditable={isEditable}
        setEditable={setEditable}
        height={34}
        checkIconWidth={18}
        fontSize={14}
      />
      <div className="text-3xl font-medium mt-[15px]">$0</div>
      <div className="flex justify-between items-center mt-[18px]">
        <div className="text-base font-medium">Your Address</div>
        <S.QrTrigger onClick={onOpenModal}>QR-code</S.QrTrigger>
        <ModalDialog
          title="Receive"
          size="medium"
          padding="large"
          onClose={onCloseModal}
          isOpen={modal}
        >
          <QRCode />
        </ModalDialog>
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
