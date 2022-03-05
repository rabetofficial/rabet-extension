import React, { useState, useEffect } from 'react';
import * as BigNumber from 'bignumber.js';

import formatCurrency from 'popup/utils/formatCurrency';
import calculatePriceImpact from 'popup/utils/swap/calculatePriceImpact';
import AngleRight from 'popup/svgs/AngleRight';
import BN from '../../../../../../helpers/BN';

import * as S from './styles';

type AppProps = {
  path: any[];
  received: any;
  asset1: any;
  asset2: any;
  form: any;
  values: any;
};

const SwapDetail = ({
  path,
  received,
  asset1,
  asset2,
  form,
  values: formValues,
}: AppProps) => {
  const [marketPrice, setMarketPrice] = useState(0);

  let values;

  if (formValues) {
    values = formValues;
  } else {
    values = form.getState().values;
  }

  useEffect(() => {
    calculatePriceImpact(asset1, asset2).then((result) => {
      setMarketPrice(result);
    });
  }, [
    asset1.asset_code + asset1.asset_issuer,
    asset2.asset_code + asset2.asset_issuer,
  ]);

  const priceImpact = new BN(1)
    .minus(
      new BN(received.minimumReceived).div(
        new BN(marketPrice).times(values.from),
      ),
    )
    .times(100);

  let finalPriceImpact: BigNumber.BigNumber | string =
    priceImpact.toFixed(2);

  if (priceImpact.isNaN() || !priceImpact.isFinite()) {
    finalPriceImpact = new BN(0);
  }

  if (priceImpact.isLessThan(0)) {
    finalPriceImpact = new BN(0);
  }

  if (priceImpact.isLessThan(0.1)) {
    finalPriceImpact = '0.01>';
  }

  const assetType = (asset) =>
    asset.asset_type === 'native' ? 'XLM' : asset.asset_code;

  return (
    <>
      <S.Box>
        <S.BoxTitle>Path</S.BoxTitle>
        <S.Path>
          {path.map((p, index) => (
            <div key={assetType(p)}>
              {assetType(p)}
              {index !== path.length - 1 && <AngleRight />}
            </div>
          ))}
        </S.Path>
      </S.Box>

      <S.Box>
        <S.BoxTitle>Price impact</S.BoxTitle>
        <S.BoxValue className="up">
          {finalPriceImpact.toString()}%
        </S.BoxValue>
      </S.Box>

      <S.Box>
        <S.BoxTitle>Minimum received</S.BoxTitle>
        <div>
          {formatCurrency(received.minimumReceived)}{' '}
          {received.asset.asset_code}
        </div>
      </S.Box>
    </>
  );
};

export default SwapDetail;
