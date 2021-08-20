import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import showAsset from '../../../helpers/showAsset';
import arithmeticNumber from '../../../helpers/arithmetic';
import SelectOption from '../../../components/SelectOption';
import getPathData from '../../../helpers/horizon/getPathData';
import validateAddress from '../../../helpers/validate/address';
import currentActiveAccount from '../../../helpers/activeAccount';
import getAccountData from '../../../helpers/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

class PaymentSendOps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sendAsset: {},
      destAsset: {},
      bestPath: [],
      destinationAmount: 0,
    };

    this.onChangeSendAsset = this.onChangeSendAsset.bind(this);
    this.onChangeDestAsset = this.onChangeDestAsset.bind(this);
  }

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;

    const list = [];

    for (let i = 0; i < balances.length; i += 1) {
      list.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        balance: balances[i].balance,
        asset_issuer: balances[i].asset_issuer,
        asset_code: balances[i].asset_code,
        asset_type: balances[i].asset_type,
      });
    }

    this.setState({
      list,
      sendAsset: list[0],
      destAsset: list[0],
    });
  }

  onChangeSendAsset(e) {
    this.setState({
      sendAsset: e,
      bestPath: [],
      destinationAmount: 0,
    });
  }

  onChangeDestAsset(e) {
    this.setState({
      destAsset: e,
      bestPath: [],
      destinationAmount: 0,
    });
  }

  async validateForm(values) {
    const { id } = this.props;
    const { sendAsset, destAsset } = this.state;

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

      if (sendAsset.value === 'XLM') {
        const xlmBalance = activeAccount.balances.find((x) => x.asset_type === 'native');

        selectedTokenBalance = xlmBalance;
      } else {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_code === sendAsset.value,
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

      if (destAsset.value !== 'XLM') {
        selectedToken = destinationTokens.find(
          (x) => x.asset_code === destAsset.value,
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
          const sourceAsset = activeAccount.balances.find((x) => x.asset_code === sendAsset.value);
          const destinationAsset = activeAccount.balances.find((x) => x.asset_code
          === destAsset.value);

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
            const bestPath = [
              sourceAsset,
              ...pathData.path,
              destinationAsset,
            ];

            this.setState({
              bestPath,
              destinationAmount: pathData.destination_amount,
            });

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
  }

  render() {
    const {
      list,
      sendAsset,
      destAsset,
      bestPath,
      destinationAmount,
    } = this.state;

    return (
      <Form
        mutators={{
          sendAmountMax: (args, state, utils) => {
            const { activeAccount } = currentActiveAccount();
            const { balances } = activeAccount;

            let maxBalance;

            if (sendAsset.value === 'XLM') {
              const xlmBalance = activeAccount.balances.find(
                (x) => x.asset_type === 'native',
              );

              maxBalance = arithmeticNumber(
                parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM,
              );
            } else {
              maxBalance = balances.find(
                (x) => x.asset_code === sendAsset.value,
              ).balance;
            }

            utils.changeValue(state, 'sendAmount', () => maxBalance);
          },
        }}
        onSubmit={() => {}}
        validate={(values) => this.validateForm(values)}
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
                      onChange={this.onChangeSendAsset}
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
                      onChange={this.onChangeDestAsset}
                      variant="select-outlined"
                      defaultValue={list[0]}
                      selected={destAsset}
                    />
                  </div>
                </div>
              )}
            </Field>
            {bestPath.length ? (
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
            ) : ''}

            {submitError && <div className="error">{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

PaymentSendOps.propTypes = {};

export default PaymentSendOps;
