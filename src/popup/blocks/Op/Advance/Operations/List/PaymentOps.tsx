import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Horizon, StrKey } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';
import { ElementOption } from 'popup/models';
import Input from 'popup/components/common/Input';
import getAccountData from 'popup/api/getAccount';
import getMaxBalance from 'popup/utils/maxBalance';
import isTransferable from 'popup/utils/isTransferable';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import controlNumberInput from 'popup/utils/controlNumberInput';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  amount: string;
  destination: string;
};

type AppProps = {
  id: string;
};

const PaymentOps = ({ id }: AppProps) => {
  const account = useActiveAccount();

  const { subentry_count } = account;
  const assets = account.assets || [];

  const assetsMapped = assets.map((asset) => ({
    label: asset.asset_code || 'XLM',
    value: asset,
  }));

  const [selected, setSelected] = useState(assetsMapped[0]);

  const onChange = (
    e: ElementOption<Horizon.HorizonApi.BalanceLine>,
  ) => {
    setSelected(e);
  };

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      asset: selected.value,
    };

    const errors: Partial<FormValidate> = {};

    const hasError = {
      amount: false,
      destination: false,
    };

    if (!values.amount) {
      errors.amount = '';
      hasError.amount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (new BN(values.amount).isLessThanOrEqualTo('0')) {
      errors.amount = 'Amount must be higher than 0.';
      hasError.amount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (
        !isInsufficientAsset(
          values.asset,
          subentry_count,
          values.amount,
        )
      ) {
        errors.amount = `Insufficient ${
          values.asset.asset_code || 'XLM'
        } balance.`;
        hasError.amount = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.destination) {
      errors.destination = '';
      hasError.destination = true;
    } else {
      if (!StrKey.isValidEd25519PublicKey(values.destination)) {
        errors.destination = 'Invalid destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!hasError.amount && !hasError.destination && values.asset) {
      if (values.asset.asset_issuer === values.destination) {
        changeOperationAction(id, {
          checked: true,
          isAccountNew: false,
          amount: parseFloat(values.amount).toFixed(7),
          destination: values.destination,
          asset: values.asset,
        });

        return;
      }

      const accountData = await getAccountData(values.destination);

      const [transferableResult, resultCode] = isTransferable(
        values,
        accountData,
      );

      let checked = true;

      if (!transferableResult && resultCode === 'INACTIVE') {
        errors.destination =
          'Inactive accounts cannot receive tokens.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      } else if (!transferableResult && resultCode === 'NO_TRUST') {
        errors.destination =
          'The destination account does not trust the asset you are attempting to send.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      } else if (
        !transferableResult &&
        resultCode === 'LIMIT_EXCEED'
      ) {
        errors.destination =
          'The destination account balance would exceed the trust of the destination in the asset.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      }

      const isAccountNew = resultCode === 'INACTIVE';

      changeOperationAction(id, {
        checked,
        isAccountNew,
        amount: parseFloat(values.amount).toFixed(7),
        destination: values.destination,
        asset: values.asset,
      });
    } else {
      changeOperationAction(id, {
        checked: false,
      });
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        setMax: (a, s, u) => {
          u.changeValue(s, 'amount', () =>
            getMaxBalance(selected.value, account),
          );
        },
      }}
      onSubmit={() => {}}
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit, form }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="destination">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Destination</label>

                <Input
                  type="text"
                  placeholder="G…"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="amount">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">Amount</label>

                <div className="flex items-start pt-2">
                  <div className="basis-full">
                    <Input
                      noMT
                      type="number"
                      placeholder="1"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      styleType="light"
                      className="grow"
                      setMax={form.mutators.setMax}
                      onKeyPress={controlNumberInput}
                    />
                  </div>

                  <SelectOption
                    items={assetsMapped}
                    onChange={onChange}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    defaultValue={selected}
                    selected={selected}
                  />
                </div>
              </>
            )}
          </Field>

          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default PaymentOps;
