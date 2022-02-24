import React from 'react';
import { Horizon } from 'stellar-sdk';

import useTypedSelector from 'popup/hooks/useTypedSelector';
import formatCurrency from 'popup/utils/formatCurrency';
import handleAssetAlt from 'popup/utils/handleAssetAlt';
import handleAssetPrice from 'popup/utils/handleAssetPrice';
import handleAssetImage from 'popup/utils/handleAssetImage';
import handleAssetSymbol from 'popup/utils/handleAssetSymbol';
import questionIcon from '../../../../../../assets/images/question-circle.png';
import ImageOnErrorHandler from '../../../../../../helpers/ImageOnErrorHandler';

import * as S from './styles';

type AssetType = {
  asset: Horizon.BalanceLine;
};

const Asset = ({ asset }: AssetType) => {
  const [assetImages, currencies, options, bids] = useTypedSelector(
    (store) => [
      store.assetImages,
      store.currencies,
      store.options,
      store.bids,
    ],
  );

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
    <S.Container className="flex items-center py-[18px]">
      <S.Circle>
        <S.Image
          src={handleAssetImage(asset, assetImages)}
          alt={handleAssetAlt(asset)}
          onError={(e) => ImageOnErrorHandler(e, questionIcon)}
        />
      </S.Circle>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="text-base font-medium">{asset_code}</div>
          <div className="text-sm text-primary-dark mt-[2px]">
            {asset_code}
          </div>
        </div>
        <div className="flex flex-col text-right">
          <div className="text-base font-medium">
            {formatCurrency(asset.balance)} {asset_code}
          </div>
          <div className="text-sm text-primary-dark mt-[2px]">
            {handleAssetSymbol(currencies, options)}
            {handleAssetPrice(asset, currencies, options, bids)}
          </div>
        </div>
      </div>
    </S.Container>
  );
};

export default Asset;
