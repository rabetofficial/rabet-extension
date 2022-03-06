import classNames from 'classnames';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from '../../../components/Input';
import isNative from '../../../utils/isNative';
import matchAsset from '../../../utils/matchAsset';
import nativeAsset from '../../../utils/nativeAsset';
import getMaxBalance from '../../../utils/maxBalance';
import SelectOption from '../../../components/SelectOption';
import currentActiveAccount from '../../../utils/activeAccount';
import getAccountData from '../../../utils/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';
import isInsufficientAsset from '../../../utils/isInsufficientAsset';
import isTransferable from '../../../utils/isTransferable';

const PaymentOps = ({ id }) => {
  const {
    activeAccount: { balances, maxXLM },
  } = currentActiveAccount();
  const [selected, setSelected] = useState(balances[0]);

  const onChange = (e) => setSelected(e);

  const validateForm = async (v) => {
    const values = {
      ...v,
      asset: selected,
    };

    const errors = {};

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
      validate={(values) => validateForm(values)}
      render={({ submitError, handleSubmit, form }) => (
        <form
          className={classNames(styles.form, 'form')}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="destination">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Destination</label>

                <Input
                  type="text"
                  placeholder="G…"
                  size="input-medium"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </div>
            )}
          </Field>

          <Field name="amount">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Amount</label>

                  <Input
                    type="number"
                    placeholder="1"
                    size="input-medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    setMax={form.mutators.setMax}
                  />
                </div>

                <div className={styles.select}>
                  <SelectOption
                    items={balances}
                    onChange={onChange}
                    variant="select-outlined"
                    defaultValue={selected}
                    selected={selected}
                  />
                </div>
              </div>
            )}
          </Field>

          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default PaymentOps;
