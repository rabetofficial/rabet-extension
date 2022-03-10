import BigNumber from 'bignumber.js';
import { useWatch } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import BN from 'helpers/BN';
import formatBalance from 'popup/utils/formatBalance';
import { FormValues } from 'popup/blocks/Op/Basic/Swap';
import angleRightIcon from 'assets/images/angle-right.svg';
import calculatePriceImpact from 'popup/api/calculatePriceImpact';

import * as S from './styles';

type SwapDetailsProps = {
  path: any[];
  values: FormValues;
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

  return (
    <>
      <S.Box>
        <S.BoxTitle>Path</S.BoxTitle>
        <S.Path>
          {path.map((p, index) => (
            <div key={p.asset_code}>
              {p.asset_type === 'native' ? 'XLM' : p.asset_code}
              {index !== path.length - 1 && (
                <img src={angleRightIcon} alt="icon" />
              )}
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

export default SwapDetails;
