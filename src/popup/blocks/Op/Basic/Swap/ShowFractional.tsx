import React from 'react';
import { useWatch } from 'react-hook-form';

import BN from 'helpers/BN';

type ShowFractionalProps = {
  control: any;
  isRotateActive: any;
};

const ShowFractional = ({
  control,
  isRotateActive,
}: ShowFractionalProps) => {
  const formValues = useWatch({ control });

  const values = {
    value1: formValues.from,
    asset1: formValues.asset1,
    value2: formValues.to,
    asset2: formValues.asset2,
  };

  if (isRotateActive) {
    values.value1 = formValues.to;
    values.asset1 = formValues.asset2;
    values.value2 = formValues.from;
    values.asset2 = formValues.asset1;
  }

  const denominator = new BN(values.value2)
    .div(new BN(values.value1))
    .toFixed(5);

  return (
    <span className="text-sm text-primary-dark">
      1 {values.asset1.asset_code} = {denominator.toString()}{' '}
      {values.asset2.asset_code}
    </span>
  );
};

export default ShowFractional;
