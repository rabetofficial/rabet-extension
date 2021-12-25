import classNames from 'classnames';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import isNative from '../../../utils/isNative';
import matchAsset from '../../../utils/matchAsset';
import nativeAsset from '../../../utils/nativeAsset';
import getMaxBalance from '../../../utils/maxBalance';
import SelectOption from '../../../components/SelectOption';
import validateAddress from '../../../utils/validate/address';
import currentActiveAccount from '../../../utils/activeAccount';
import getAccountData from '../../../utils/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

const PaymentReceiveOps = ({ id }) => {
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();

  const [sendAsset, setSendAsset] = useState(balances[0]);
  const [destAsset, setDestAsset] = useState(balances[0]);

  const onChangeSendAsset = (e) => setSendAsset(e);
  const onChangeDestAsset = (e) => setDestAsset(e);

  const validateForm = async (values) => {
    let accountData;

    const errors = {};
    const hasError = {};

    if (!values.destination) {
      errors.destination = null;
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (!validateAddress(values.destination)) {
      errors.destination = 'Invalid destination.';
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      accountData = await getAccountData(values.destination);

      if (accountData.status === 404) {
        errors.destination = 'Inactive destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else if (accountData.status === 400) {
        errors.destination = 'Wrong destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.sendMax) {
      errors.sendMax = null;
      hasError.sendMax = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(sendAsset)) {
        selectedTokenBalance = balances.find(nativeAsset);
      } else {
        selectedTokenBalance = balances.find((x) => matchAsset(x, sendAsset));
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      const { selling_liabilities } = selectedTokenBalance;
      const numSL = Number(selling_liabilities);

      if (isNative(sendAsset)) {
        if (
          Number(selectedTokenBalance.balance || '0')
          < Number(values.sendMax, 10) + maxXLM + numSL
        ) {
          errors.sendMax = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendMax = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') < parseFloat(values.sendMax, 10) + numSL
        ) {
          errors.sendMax = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendMax = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destAmount) {
      errors.destAmount = null;
      hasError.destAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination
      && !hasError.sendMax
      && !hasError.destAmount
      && sendAsset.value
      && destAsset.value
    ) {
      const destinationTokens = accountData.balances || [];

      let selectedToken = destinationTokens.find(nativeAsset);

      if (!isNative(destAsset)) {
        selectedToken = destinationTokens.find((x) => matchAsset(x, destAsset));
      } else {
        selectedToken.limit = 999999999;
      }

      if (!selectedToken) {
        errors.destination = 'The destination account does not trust the asset you are attempting to send.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else {
        if (
          Number(selectedToken.limit)
          < Number(values.destAmount) + Number(selectedToken.balance)
        ) {
          errors.destination = 'The destination account balance would exceed the trust of the destination in the asset.';
          hasError.destination = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }

      changeOperationAction(id, {
        checked: true,
        destination: values.destination,
        sendMax: parseFloat(values.sendMax, 10).toFixed(7),
        sendAsset,
        destAmount: parseFloat(values.destAmount, 10).toFixed(7),
        destAsset,
      });
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendMaxMax: (a, s, u) => {
          u.changeValue(s, 'sendMax', () => getMaxBalance(sendAsset));
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
          <Field name="sendMax">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Send max</label>

                  <Input
                    type="number"
                    placeholder="1"
                    size="input-medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    setMax={form.mutators.sendMaxMax}
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={balances}
                    defaultValue={sendAsset}
                    onChange={onChangeSendAsset}
                    variant="select-outlined"
                    selected={sendAsset}
                  />
                </div>
              </div>
            )}
          </Field>
          <Field name="destAmount">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Destination amount</label>
                  <Input
                    type="number"
                    placeholder="1"
                    size="input-medium"
                    input={input}
                    meta={meta}
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={balances}
                    defaultValue={destAsset}
                    onChange={onChangeDestAsset}
                    variant="select-outlined"
                    selected={destAsset}
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

export default PaymentReceiveOps;
