import React, { useState } from 'react';

// import EditWalletName from 'popup/components/EditWalletName';
import CopyText from 'popup/components/common/CopyText';

import * as S from './styles';

const sampleAddress =
  'GCTRXBGMSI64VVXX5O5EUFTGWOTICIHC7PUO24VMD4VOTVCSO6ODKAPQ';

const AddressBlock = () => {
  const [isEditable, setEditable] = useState(false);
  return (
    <S.Card className="pt-[22px] pb-[18px]">
      {/* <EditWalletName */}
      {/*  isEditable={isEditable} */}
      {/*  setEditable={setEditable} */}
      {/*  height={34} */}
      {/*  fontSize={14} */}
      {/* /> */}
      <div className="text-3xl font-medium mt-[15px]">$991.62</div>
      <div className="flex justify-between items-center mt-[18px]">
        <div className="text-base font-medium">Your Address</div>
        <S.QrTrigger>QR-code</S.QrTrigger>
      </div>
      <S.AddressBox>
        <CopyText
          text={sampleAddress}
          custom={<S.Address>{sampleAddress}</S.Address>}
        />
      </S.AddressBox>
    </S.Card>
  );
};

export default AddressBlock;
