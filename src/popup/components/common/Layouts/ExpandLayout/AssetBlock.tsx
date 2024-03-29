import React from 'react';

import PlusBold from 'popup/svgs/PlusBold';
import AddAsset from 'popup/blocks/AddAsset';
import openModalAction from 'popup/actions/modal/open';

import * as S from './styles';
import AssetList from './AssetList';

const AssetBlock = () => {
  const onOpenModal = () => {
    openModalAction({
      isStyled: true,
      size: 'medium',
      minHeight: 545,
      padding: 'large',
      title: 'Add asset',
      children: <AddAsset usage="desktop" />,
    });
  };

  return (
    <S.Card className="rounded pt-[20px] h-[386px]">
      <div className="flex justify-between items-center pb-[15px]">
        <div className="text-lg font-medium">Assets</div>
        <S.AssetTrigger onClick={onOpenModal}>
          <PlusBold />

          <div className="ml-1">Add assets</div>
        </S.AssetTrigger>
      </div>
      <div className="mx-[-24px]">
        <AssetList usage="desktop" />
      </div>
    </S.Card>
  );
};

export default AssetBlock;
