import { useWatch } from 'react-hook-form';

import BN from '../../../../../helpers/BN';

const ShowFractional = ({ control }) => {
  const formValues = useWatch({ control });

  const denominator = new BN(formValues.to)
    .div(new BN(formValues.from))
    .toFixed(5);

  return (
    <span>
      1
      {' '}
      {formValues.asset1.asset_code}
      {' '}
      =
      {' '}
      {denominator.toString()}
      {' '}
      {formValues.asset2.asset_code}
    </span>
  );
};

export default ShowFractional;
