import React, { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { useWatch } from 'react-hook-form';

import BN from 'helpers/BN';
import formatBalance from 'popup/utils/formatBalance';
import { FormValues } from 'popup/blocks/Op/Basic/Swap';
import calculatePriceImpact from 'popup/api/calculatePriceImpact';
import AngleRight from 'popup/svgs/AngleRight';

import * as S from './styles';

const priceImpactColor = (priceImpact: string) => {
  const PI = new BN(priceImpact);

  if (PI.isLessThanOrEqualTo(0.5)) {
    return 'green';
  }

  if (PI.isLessThanOrEqualTo(10)) {
    return 'orange';
  }

  if (priceImpact === '<0.01') {
    return 'green';
  }

  return 'red';
};

type SwapDetailsProps = {
  path: any[];
  values?: FormValues;
  control?: any;
  minimumReceived: number;
};

const SwapDetails = ({
  path,
  values,
  control,
  minimumReceived,
}: SwapDetailsProps) => {
  const [marketPrice, setMarketPrice] = useState<BigNumber | string>(
    '',
  );

  let formValues = values;

  if (control) {
    formValues = useWatch({ control });
  }

  useEffect(() => {
    calculatePriceImpact(formValues.asset1, formValues.asset2).then(
      (result) => {
        setMarketPrice(result);
      },
    );
  }, [formValues]);

  const priceImpact = new BN(1)
    .minus(
      new BN(minimumReceived).div(
        new BN(marketPrice).times(formValues.from),
      ),
    )
    .times(100);

  let finalPriceImpact = priceImpact.toFixed(2);

  if (priceImpact.isNaN() || !priceImpact.isFinite()) {
    finalPriceImpact = '0';
  }

  if (priceImpact.isLessThan(0)) {
    finalPriceImpact = '0';
  }

  if (priceImpact.isLessThan(0.1)) {
    finalPriceImpact = '<0.01';
  }

  const assetCode = (asset) =>
    asset.asset_type === 'native' ? 'XLM' : asset.asset_code;

  return (
    <>
      <S.Box>
        <S.BoxTitle>Path</S.BoxTitle>
        <S.Path>
          {path.map((p, index) => (
            <div key={assetCode(p)} className="flex items-center">
              {assetCode(p)}
              {index !== path.length - 1 && (
                <div className="mx-[5px]">
                  <AngleRight />
                </div>
              )}
            </div>
          ))}
        </S.Path>
      </S.Box>

      <S.Box>
        <S.BoxTitle>Price impact</S.BoxTitle>
        <S.BoxValue
          className="up"
          color={priceImpactColor(finalPriceImpact)}
        >
          {finalPriceImpact.toString()}%
        </S.BoxValue>
      </S.Box>

      <S.Box>
        <S.BoxTitle>Minimum received</S.BoxTitle>
        <div>
          {minimumReceived ? (
            <>
              {formatBalance(minimumReceived.toString())}{' '}
              {formValues.asset2.asset_code || 'XLM'}
            </>
          ) : (
            <p>Asset</p>
          )}
        </div>
      </S.Box>
    </>
  );
};

SwapDetails.defaultProps = {
  values: null,
  control: null,
};

export default SwapDetails;
