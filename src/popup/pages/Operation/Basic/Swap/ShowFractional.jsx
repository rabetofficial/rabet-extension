import { useWatch } from 'react-hook-form';

import BN from '../../../../../helpers/BN';

const ShowFractional = ({ control, isRotateActive }) => {
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
    <span>
      1
      {' '}
      {values.asset1.asset_code}
      {' '}
      =
      {' '}
      {denominator.toString()}
      {' '}
      {values.asset2.asset_code}
    </span>
  );
};

export default ShowFractional;
