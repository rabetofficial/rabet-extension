import React from 'react';
import { Horizon } from 'stellar-sdk';

import useTypedSelector from 'popup/hooks/useTypedSelector';
import formatCurrency from 'popup/utils/formatCurrency';
import handleAssetAlt from 'popup/utils/handleAssetAlt';
import handleAssetPrice from 'popup/utils/handleAssetPrice';
import handleAssetImage from 'popup/utils/handleAssetImage';
import handleAssetSymbol from 'popup/utils/handleAssetSymbol';
import BlackCheck from 'popup/svgs/BlackCheck';
import questionIcon from '../../../../../../assets/images/question-circle.png';
import ImageOnErrorHandler from '../../../../../../helpers/ImageOnErrorHandler';

import * as S from './styles';

type AssetType = {
  asset: Horizon.BalanceLine;
  isVerified: boolean;
};

const Asset = ({ asset, isVerified }: AssetType) => {
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
  if (isVerified) {
    return (
      <span className="ml-1">
        <BlackCheck width="16" height="16" />
      </span>
    );
  }
  return (
    <S.Container className="flex items-center py-[18px]">
      <S.Circle>
        <S.Image
          isDark={asset.asset_type === 'native'}
          src={handleAssetImage(asset, assetImages)}
          alt={handleAssetAlt(asset)}
          onError={(e) => ImageOnErrorHandler(e, questionIcon)}
        />
      </S.Circle>
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <div className="inline-flex text-base">
            <span className=" font-medium">
              {formatCurrency(asset.balance)}
            </span>
            <span className="text-primary-dark font-normal ml-1">
              {asset_code}
            </span>
            <div className="ml-1 mt-1">
              <BlackCheck width="16" height="16" />
            </div>
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
