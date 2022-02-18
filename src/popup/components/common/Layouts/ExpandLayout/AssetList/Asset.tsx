import React from 'react';
import { Horizon } from 'stellar-sdk';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import handleAssetAlt from 'popup/utils/handleAssetAlt';
import handleAssetImage from 'popup/utils/handleAssetImage';

import * as S from './styles';

type AssetTyp = {
  asset: Horizon.BalanceLine;
};

const Asset = ({ asset }: AssetTyp) => {
  const assetImages = useTypedSelector((store) => store.assetImages);

  let asset_code: string;

  if (
    asset.asset_type === 'credit_alphanum4' ||
    asset.asset_type === 'credit_alphanum12'
  ) {
    asset_code = asset.asset_code;
  } else {
    asset_code = 'XLM';
  }

  return (
    <div className="flex items-center py-[18px]">
      <S.Circle>
        <S.Image
          src={handleAssetImage(asset, assetImages)}
          alt={handleAssetAlt(asset)}
        />
      </S.Circle>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="text-base font-medium">{asset_code}</div>
          <div className="text-sm text-primary-dark mt-[2px]">
            {asset_code}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-base font-medium">
            {asset.balance} {asset_code}
          </div>
          <div className="text-sm text-primary-dark mt-[2px]">
            $5.256
          </div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
