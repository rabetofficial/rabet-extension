import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import arithmeticNumber from '../../../helpers/arithmetic';
import SelectOption from '../../../components/SelectOption';
import validateAddress from '../../../helpers/validate/address';
import currentActiveAccount from '../../../helpers/activeAccount';
import getAccountData from '../../../helpers/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

class PaymentReceiveOps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sendAsset: {},
      destAsset: {},
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
    this.setState({ sendAsset: e });
  }

  onChangeDestAsset(e) {
    this.setState({ destAsset: e });
  }

  async validateForm(values) {
    const { id, sendAsset, destAsset } = this.props;
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

      if (sendAsset.value === 'XLM') {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_type === 'native',
        );
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
          (x) => x.asset_code === destAsset.value,
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
  }

  render() {
    const { list, sendAsset, destAsset } = this.state;

    return (
      <Form
        mutators={{
          sendMaxMax: (args, state, utils) => {
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

            utils.changeValue(state, 'sendMax', () => maxBalance);
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
                      onChange={this.onChangeSendAsset}
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
                      onChange={this.onChangeDestAsset}
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
  }
}

PaymentReceiveOps.propTypes = {};

export default PaymentReceiveOps;
