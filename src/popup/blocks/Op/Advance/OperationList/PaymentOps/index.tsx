import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from 'popup/components/common/Input';
import isNative from 'popup/utils/isNative';
import matchAsset from 'popup/utils/matchAsset';
import nativeAsset from 'popup/utils/nativeAsset';
import getMaxBalance from 'popup/utils/maxBalance';
import SelectOption from 'popup/components/common/SelectOption';
import getAccountData from 'popup/utils/horizon/isAddressFound';
import changeOperationAction from 'popup/actions/operations/change';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import isTransferable from 'popup/utils/isTransferable';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import { ElementOption } from 'popup/models';

type FormValidate = {
  destination: string;
  amount: string | null;
};

type AppProps = {
  id: string;
};

const PaymentOps = ({ id }: AppProps) => {
  const { maxXLM } = useActiveAccount();

  const balances = Array(5).fill({
    asset_code: 'XLM',
    asset_issuer: '123',
    last_modified_ledger: '234',
    limit: '567',
    is_authorized: false,
    is_authorized_to_maintain_liabilities: true,
    logo: '',
    domain: 'Stellar.org',
    toNative: 1,
  });

  const [selected, setSelected] = useState(balances[0]);

  const onChange = (e: ElementOption) => setSelected(e);

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      asset: selected,
    };

    const errors = {} as FormValidate;

    const hasError = {
      amount: false,
      destination: false,
    };

    if (!values.amount) {
      errors.amount = null;
      hasError.amount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(selected)) {
        selectedTokenBalance = balances.find(nativeAsset);
      } else {
        selectedTokenBalance = balances.find((x) =>
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
          maxXLM,
          values.amount,
        )
      ) {
        errors.amount = `Insufficient ${selected.asset_code} balance.`;
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
          u.changeValue(s, 'amount', () => getMaxBalance(selected));
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
                    items={balances}
                    onChange={onChange}
                    variant="outlined"
                    width={99}
                    className="ml-2"
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
