import React from 'react';

import PlusBold from 'popup/svgs/PlusBold';
import AssetList from './AssetList';

import * as S from './styles';

const AssetBlock = () => (
  <S.Card className="pt-[20px]">
    <div className="flex justify-between items-center">
      <div className="text-lg font-medium">Assets</div>
      <S.AssetTrigger>
        <PlusBold />
        <div className="ml-1">Add assets</div>
      </S.AssetTrigger>
    </div>
    <AssetList />
  </S.Card>
);

export default AssetBlock;
