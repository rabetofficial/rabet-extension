import { useWatch } from 'react-hook-form';

import BN from '../../../../../helpers/BN';
import Button from '../../../../components/Button';
import isAssetEqual from '../../../../utils/swap/isAssetEqual';
import useActiveAcconut from '../../../../hooks/useActiveAccount';
import { buttonSizes, buttonTypes } from '../../../../staticRes/enum';
import isInsufficientAsset from '../../../../utils/isInsufficientAsset';

const SwapButton = ({ control }) => {
  const formValues = useWatch({ control });
  const { maxXLM } = useActiveAcconut();

  let disabled = true;

  if (!formValues.asset2) {
    // Asset2 is NONE
    disabled = true;
  } else if (isAssetEqual(formValues.asset1, formValues.asset2)) {
    // Assets are identical
    disabled = true;
  } else if (new BN(formValues.from).isLessThanOrEqualTo('0') || new BN(formValues.from).isNaN()) {
    // From is less than 0 or NaN
    disabled = true;
  } else if (!isInsufficientAsset(formValues.asset1, maxXLM, formValues.from)) {
    // Insufficient amount
    disabled = true;
  } else {
    disabled = false;
  }

  return (
    <Button
      type="submit"
      variant={buttonTypes.primary}
      size={buttonSizes.medium}
      content="Send"
      disabled={disabled}
    />
  );
};

export default SwapButton;
