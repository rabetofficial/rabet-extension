import React from 'react';

import QRCode from 'popup/blocks/QRCode';
import formatBalance from 'popup/utils/formatBalance';
import openModalAction from 'popup/actions/modal/open';
import CopyText from 'popup/components/common/CopyText';
import useTotalBalance from 'popup/hooks/useTotalBalance';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import EditWalletName from 'popup/components/EditWalletName';
import handleAssetSymbol from 'popup/utils/handleAssetSymbol';

import * as S from './styles';

const AddressBlock = () => {
  const balance = useTotalBalance();
  const { publicKey } = useActiveAccount();
  const [currencies, options] = useTypedSelector((store) => [
    store.currencies,
    store.options,
  ]);

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
      <span className="font-medium">
        <EditWalletName
          height={34}
          checkIconWidth={18}
          fontSize={14}
        />
      </span>

      <div className="text-3xl font-medium mt-[15px]">
        {handleAssetSymbol(currencies, options)}
        {formatBalance(balance)}
      </div>

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
