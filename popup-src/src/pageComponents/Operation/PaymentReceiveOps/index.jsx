import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import isNative from '../../../helpers/isNative';
import arithmeticNumber from '../../../helpers/arithmetic';
import SelectOption from '../../../components/SelectOption';
import validateAddress from '../../../helpers/validate/address';
import currentActiveAccount from '../../../helpers/activeAccount';
import getAccountData from '../../../helpers/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

const PaymentReceiveOps = ({ id }) => {
  const [list, setList] = useState([]);
  const [sendAsset, setSendAsset] = useState({});
  const [destAsset, setDestAsset] = useState({});

  useEffect(() => {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;

    const newList = [];

    for (let i = 0; i < balances.length; i += 1) {
      newList.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        balance: balances[i].balance,
        asset_issuer: balances[i].asset_issuer,
        asset_code: balances[i].asset_code,
        asset_type: balances[i].asset_type,
      });
    }

    setList(newList);
    setSendAsset(newList[0]);
    setDestAsset(newList[0]);
  }, []);

  const onChangeSendAsset = (e) => {
    setSendAsset(e);
  };

  const onChangeDestAsset = (e) => {
    setDestAsset(e);
  };

  const validateForm = async (values) => {
    let accountData;
    const { activeAccount } = currentActiveAccount();

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
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_type === 'native',
        );
      } else {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_code === sendAsset.asset_code && x.asset_issuer === sendAsset.asset_issuer,
        );
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      if (sendAsset.value === 'XLM') {
        if (
          Number(selectedTokenBalance.balance || '0')
          < Number(values.sendMax, 10) + activeAccount.maxXLM
        ) {
          errors.sendMax = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendMax = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') < parseFloat(values.sendMax, 10)
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

      let selectedToken = destinationTokens.find((x) => x.asset_type === 'native');

      if (destAsset.value !== 'XLM') {
        selectedToken = destinationTokens.find(
          (x) => x.asset_code === destAsset.asset_code && x.asset_issuer === destAsset.asset_issuer,
        );
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
        sendMaxMax: (args, state, utils) => {
          const { activeAccount } = currentActiveAccount();
          const { balances } = activeAccount;

          let maxBalance;

          if (isNative(sendAsset)) {
            const xlmBalance = activeAccount.balances.find(
              (x) => x.asset_type === 'native',
            );

            maxBalance = arithmeticNumber(
              parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM,
            );
          } else {
            maxBalance = balances.find(
              (x) => x.asset_code === sendAsset.asset_code
              && x.asset_issuer === sendAsset.asset_issuer,
            ).balance;
          }

          utils.changeValue(state, 'sendMax', () => maxBalance);
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
                    setMax={() => {
                      form.mutators.sendMaxMax();
                    }}
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={list}
                    defaultValue={list[0]}
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
                    items={list}
                    defaultValue={list[0]}
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

PaymentReceiveOps.propTypes = {};

export default PaymentReceiveOps;
