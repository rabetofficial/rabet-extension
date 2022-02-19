/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import PlusBold from 'popup/svgs/PlusBold';
import AddAsset from 'popup/pageComponents/NewAddAsset/AddAsset';
import ModalDialog from 'popup/components/common/ModalDialog';
import AssetList from './AssetList';

import * as S from './styles';

const AssetBlock = () => {
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);

  return (
    <S.Card className="pt-[20px]">
      <div className="flex justify-between items-center pb-[15px]">
        <div className="text-lg font-medium">Assets</div>
        <S.AssetTrigger onClick={onOpenModal}>
          <PlusBold />
          <div className="ml-1">Add assets</div>
        </S.AssetTrigger>
        <ModalDialog
          title="Add asset"
          size="medium"
          padding="large"
          onClose={onCloseModal}
          isOpen={modal}
        >
          <AddAsset setModal={setModal} />
        </ModalDialog>
      </div>
      <AssetList />
    </S.Card>
  );
};

export default AssetBlock;
