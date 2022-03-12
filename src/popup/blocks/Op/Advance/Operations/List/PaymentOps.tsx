import React, { useState } from 'react';
import { Horizon, StrKey } from 'stellar-sdk';
import { Form, Field } from 'react-final-form';

import { ElementOption } from 'popup/models';
import matchAsset from 'popup/utils/matchAsset';
import Input from 'popup/components/common/Input';
import getAccountData from 'popup/api/getAccount';
import getMaxBalance from 'popup/utils/maxBalance';
import isTransferable from 'popup/utils/isTransferable';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
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

  const [selected, setSelected] = useState(assets[0]);

  const onChange = (e: ElementOption<Horizon.BalanceLine>) => {
    setSelected(e.value);
    console.log(e.value);
  };

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      asset: selected,
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
    } else {
      let selectedTokenBalance;

      if (selected.asset_type === 'native') {
        selectedTokenBalance = assets.find(
          (asset) => asset.asset_type === 'native',
        );
      } else {
        selectedTokenBalance = assets.find((x) =>
          matchAsset(x, selected),
        );
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      if (
        !isInsufficientAsset(
          selectedTokenBalance,
          subentry_count,
          values.amount,
        )
      ) {
        errors.amount = `Insufficient ${
          selected.asset_code || 'XLM'
        } balance.`;
        hasError.amount = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!StrKey.isValidEd25519PublicKey(values.destination)) {
      errors.destination = 'Invalid destination.';
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.amount &&
      !hasError.destination &&
      selected.asset_code
    ) {
      if (selected.asset_issuer === values.destination) {
        changeOperationAction(id, {
          checked: true,
          isAccountNew: false,
          amount: parseFloat(values.amount, 10).toFixed(7),
          destination: values.destination,
          asset: selected,
        });

        return;
      }

      const accountData = await getAccountData(values.destination);

      const [transferableResult, resultCode] = isTransferable(
        values,
        accountData,
      );
      let checked = true;

      if (!transferableResult && resultCode === 0) {
        errors.destination =
          'Inactive accounts cannot receive tokens.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      } else if (!transferableResult && resultCode === 1) {
        errors.destination = 'Wrong.';
        hasError.destination = true;
      } else if (!transferableResult && resultCode === 2) {
        errors.destination =
          'The destination account does not trust the asset you are attempting to send.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      } else if (!transferableResult && resultCode === 3) {
        errors.destination =
          'The destination account balance would exceed the trust of the destination in the asset.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });

        checked = false;
      }

      const isAccountNew = resultCode === 0;

      changeOperationAction(id, {
        checked,
        isAccountNew,
        amount: parseFloat(values.amount, 10).toFixed(7),
        destination: values.destination,
        asset: selected,
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
            getMaxBalance(selected, account),
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

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1"
                    size="medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    styleType="light"
                    className="grow"
                    setMax={form.mutators.setMax}
                  />

                  <SelectOption
                    items={assets}
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
