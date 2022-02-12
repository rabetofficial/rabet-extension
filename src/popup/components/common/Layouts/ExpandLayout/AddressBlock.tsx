import React, { useState } from 'react';

import EditWalletName from 'popup/components/EditWalletName';
import CopyText from 'popup/components/common/CopyText';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import * as S from './styles';

const AddressBlock = () => {
  const [isEditable, setEditable] = useState(false);
  const { publicKey, balance } = useActiveAccount();

  return (
    <S.Card className="pt-[22px] pb-[18px]">
      <EditWalletName
        isEditable={isEditable}
        setEditable={setEditable}
        height={34}
        fontSize={14}
      />
      <div className="text-3xl font-medium mt-[15px]">${balance}</div>
      <div className="flex justify-between items-center mt-[18px]">
        <div className="text-base font-medium">Your Address</div>
        <S.QrTrigger>QR-code</S.QrTrigger>
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