/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import PlusBold from 'popup/svgs/PlusBold';
import AssetList from './AssetList';
import AddAsset from 'popup/pageComponents/NewAddAsset/AddAsset';

import * as S from './styles';

const AssetBlock = () => {
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);
  const handleClick = () => {
    modal === true ? (
      <AddAsset OpenModal={onOpenModal} CloseModal={onCloseModal} />
    ) : (
      ''
    );
  };

  return (
    <S.Card className="pt-[20px]">
      <div className="flex justify-between items-center">
        <div className="text-lg font-medium">Assets</div>
        <S.AssetTrigger onClick={handleClick}>
          <PlusBold />
          <div className="ml-1">Add assets</div>
        </S.AssetTrigger>
      </div>
      <AssetList />
    </S.Card>
  );
};

export default AssetBlock;
