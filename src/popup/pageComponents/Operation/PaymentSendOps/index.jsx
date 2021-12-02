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

const PaymentSendOps = ({ id }) => {
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();

  const [list] = useState(() => {
    const newList = [];

    for (let i = 0; i < balances.length; i += 1) {
      newList.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        ...balances[i],
      });
    }

    return newList;
  });

  const [sendAsset, setSendAsset] = useState(list[0]);
  const [destAsset, setDestAsset] = useState(list[0]);

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

    if (!values.sendAmount) {
      errors.sendAmount = null;
      hasError.sendAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(sendAsset)) {
        const xlmBalance = balances.find(nativeAsset);

        selectedTokenBalance = xlmBalance;
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
          < Number(values.sendAmount, 10) + maxXLM + numSL
        ) {
          errors.sendAmount = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') < parseFloat(values.sendAmount, 10) + numSL
        ) {
          errors.sendAmount = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destMin) {
      errors.destMin = null;
      hasError.destMin = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination
      && !hasError.sendAmount
      && !hasError.destMin
      && sendAsset.value
      && destAsset.value
    ) {
      const destinationTokens = accountData.balances || [];
      let selectedToken = destinationTokens.find((x) => x.asset_type === 'native');

      if (!isNative(destAsset)) {
        selectedToken = destinationTokens.find((x) => matchAsset(x, destAsset));
      } else {
        selectedToken.limit = 999999999;
      }

      if (!selectedToken) {
        errors.destMin = 'The destination account does not trust the asset you are attempting to send.';
        hasError.destMin = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else {
        if (
          Number(selectedToken.limit)
          < Number(values.destMin) + Number(selectedToken.balance)
        ) {
          errors.destMin = 'The destination account balance would exceed the trust of the destination in the asset.';
          hasError.destMin = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          changeOperationAction(id, {
            checked: true,
            destination: values.destination,
            sendAmount: parseFloat(values.sendAmount, 10).toFixed(7),
            sendAsset,
            destMin: parseFloat(values.destMin, 10).toFixed(7),
            destAsset,
          });
        }
      }
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendAmountMax: (a, s, u) => {
          u.changeValue(s, 'sendAmount', () => getMaxBalance(sendAsset));
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
          <Field name="sendAmount">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Send amount</label>
                  <Input
                    type="number"
                    placeholder="1"
                    size="input-medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    setMax={form.mutators.sendAmountMax}
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={list}
                    onChange={onChangeSendAsset}
                    variant="select-outlined"
                    defaultValue={list[0]}
                    selected={sendAsset}
                  />
                </div>
              </div>
            )}
          </Field>
          <Field name="destMin">
            {({ input, meta }) => (
              <div className="pure-g group">
                <div className={styles.selectInput}>
                  <label className="label-primary">Destination min</label>
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
                    items={list}
                    onChange={onChangeDestAsset}
                    variant="select-outlined"
                    defaultValue={list[0]}
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

export default PaymentSendOps;
