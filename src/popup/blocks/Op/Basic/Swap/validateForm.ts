/* eslint-disable no-param-reassign */
import BN from 'helpers/BN';
import getStrictSend from 'popup/api/getStrictSend';
import { IAccount } from 'popup/reducers/accounts2';
import isAssetEqual from 'popup/utils/swap/isAssetEqual';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';

import getStrictReceive from 'popup/api/getStrictReceive';
import { FormValues } from './index';

type SwapFormError = {
  from: {
    type: string;
    message: string;
  };
  to: {
    type: string;
    message: string;
  };
};

const validateForm = async (
  values: FormValues,
  account: IAccount,
  setValue,
  setLoading,
  setRealData,
  setShowSwapInfo,
) => {
  const otherField = values.lastField === 'to' ? 'from' : 'to';

  const fieldValue =
    values.lastField === 'to' ? values.to : values.from;
  setShowSwapInfo(false);

  const errors = {} as SwapFormError;

  if (fieldValue === '') {
    setValue(otherField, '');
    return { values, errors: {} };
  }

  if (new BN(fieldValue).isNaN()) {
    setValue(otherField, '');

    errors[values.lastField] = {
      type: 'error',
      message: 'Invalid amount',
    };

    return { values, errors };
  }

  if (new BN(fieldValue).isLessThanOrEqualTo('0')) {
    errors[values.lastField] = {
      type: 'error',
      message: 'Amount must be higher than 0.',
    };

    return { values, errors };
  }

  if (
    values.lastField === 'from' &&
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
  }

  if (isAssetEqual(values.asset1, values.asset2)) {
    errors.from = {
      type: 'error',
      message: 'Assets cannot be the same.',
    };

    return { values, errors };
  }

  setLoading(true);
  let calculatedResult;

  if (values.lastField === 'from') {
    calculatedResult = await getStrictSend(values);
  } else {
    calculatedResult = await getStrictReceive(values);
  }

  setLoading(false);

  if (!calculatedResult) {
    errors[values.lastField] = {
      type: 'error',
      message: 'Could not find a valid path for swap.',
    };

    return { values, errors };
  }

  if (values.lastField === 'from') {
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
  } else {
    if (
      calculatedResult.source_amount === '0' &&
      !calculatedResult.path.length
    ) {
      errors.to = {
        type: 'error',
        message: 'Could not find an order',
      };
    }
  }

  setRealData(values, calculatedResult);

  return {
    errors,
    values,
  };
};

export default validateForm;
