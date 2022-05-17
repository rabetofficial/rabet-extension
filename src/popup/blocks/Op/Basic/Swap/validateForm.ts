/* eslint-disable no-param-reassign */
import BN from 'helpers/BN';
import getStrictSend from 'popup/api/getStrictSend';
import { IAccount } from 'popup/reducers/accounts2';
import isAssetEqual from 'popup/utils/swap/isAssetEqual';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';

import { FormValues } from './index';

const validateForm = async (
  values: FormValues,
  account: IAccount,
  setValue,
  setLoading,
  setRealData,
  setShowSwapInfo,
) => {
  setValue('to', '');
  setShowSwapInfo(false);

  const errors = {};

  if (values.from === '') {
    return { values, errors: {} };
  }

  if (new BN(values.from).isNaN()) {
    setValue('to', '');

    errors.from = { type: 'error', message: 'Invalid amount' };

    return { values, errors };
  }

  if (new BN(values.from).isLessThanOrEqualTo('0')) {
    errors.from = {
      type: 'error',
      message: 'Amount must be higher than 0.',
    };

    return { values, errors };
  }

  if (
    !isInsufficientAsset(
      values.asset1,
      account.subentry_count,
      values.from,
    )
  ) {
    errors.from = {
      type: 'error',
      message: 'Insufficient amount.',
    };

    // return { values, errors };
  }

  if (isAssetEqual(values.asset1, values.asset2)) {
    errors.from = {
      type: 'error',
      message: 'Assets cannot be the same.',
    };

    return { values, errors };
  }

  setLoading(true);
  const calculatedResult = await getStrictSend(values);
  setLoading(false);

  if (!calculatedResult) {
    errors.from = {
      type: 'error',
      message: 'Could not find a valid path for swap.',
    };

    return { values, errors };
  }

  if (
    calculatedResult.destination_amount === '0' &&
    !calculatedResult.path.length
  ) {
    errors.from = {
      type: 'error',
      message: 'Could not find an order.',
    };

    return { values, errors };
  }

  setRealData(calculatedResult);

  return {
    errors,
    values,
  };
};

export default validateForm;
