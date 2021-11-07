import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import isNative from '../../../utils/isNative';
import arithmeticNumber from '../../../utils/arithmetic';
import SelectOption from '../../../components/SelectOption';
import getPathData from '../../../utils/horizon/getPathData';
import validateAddress from '../../../utils/validate/address';
import currentActiveAccount from '../../../utils/activeAccount';
import getAccountData from '../../../utils/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

const PaymentSendOps = ({ id }) => {
  const [list, setList] = useState([]);
  const [sendAsset, setSendAsset] = useState({});
  const [destAsset, setDestAsset] = useState({});
  const [bestPath, setBestPath] = useState([]);
  const [destinationAmount, setDestinationAmount] = useState(0);

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
    setBestPath([]);
    setDestinationAmount(0);
  };

  const onChangeDestAsset = (e) => {
    setDestAsset(e);
    setBestPath([]);
    setDestinationAmount(0);
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

    if (!values.sendAmount) {
      errors.sendAmount = null;
      hasError.sendAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(sendAsset)) {
        const xlmBalance = activeAccount.balances.find((x) => x.asset_type === 'native');

        selectedTokenBalance = xlmBalance;
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

      if (isNative(sendAsset)) {
        if (
          Number(selectedTokenBalance.balance || '0')
          < Number(values.sendAmount, 10) + activeAccount.maxXLM
        ) {
          errors.sendAmount = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') < parseFloat(values.sendAmount, 10)
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
        selectedToken = destinationTokens.find(
          (x) => x.asset_code === destAsset.asset_code && x.asset_issuer === destAsset.asset_issuer,
        );
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
          const sourceAsset = activeAccount.balances.find(
            (x) => x.asset_code === sendAsset.asset_code
            && x.asset_issuer === sendAsset.asset_issuer,
          );

          const destinationAsset = activeAccount.balances.find(
            (x) => x.asset_code === destAsset.asset_code
            && x.asset_issuer === destAsset.asset_issuer,
          );

          const pathData = await getPathData({
            source_account: activeAccount.publicKey,
            source_asset_type: sourceAsset.asset_type,
            source_asset_code: sourceAsset.asset_code,
            source_asset_issuer: sourceAsset.asset_issuer,
            source_amount: values.sendAmount,
            destination_account: values.destination,
            destination_asset_code: destinationAsset.asset_code,
            destination_asset_type: destinationAsset.asset_type,
            destination_asset_issuer: destinationAsset.asset_issuer,
          });

          if (!pathData) {
            errors.destination = 'No path found.';
            hasError.destination = true;

            changeOperationAction(id, {
              checked: false,
            });
          } else {
            const newBestPath = [
              sourceAsset,
              ...pathData.path,
              destinationAsset,
            ];

            setBestPath(newBestPath);
            setDestinationAmount(pathData.destination_amount);

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
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendAmountMax: (args, state, utils) => {
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

          utils.changeValue(state, 'sendAmount', () => maxBalance);
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
                    setMax={() => {
                      form.mutators.sendAmountMax();
                    }}
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
          {/* {bestPath.length ? (
            <div>
              <div>
                <p>Path:</p>
                {bestPath.map((aPath, index) => (
                  <span key={`${aPath.asset_type}${index}`}>
                    {showAsset(aPath)}
                    {' '}
                    {bestPath.length !== index + 1 ? '>' : ''}
                  </span>
                ))}
              </div>
              <p>
                Destination Amount:
                {' '}
                {destinationAmount}
              </p>
            </div>
          ) : ''} */}

          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

PaymentSendOps.propTypes = {};

export default PaymentSendOps;
