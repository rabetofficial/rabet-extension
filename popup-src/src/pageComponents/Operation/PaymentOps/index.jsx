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

class PaymentOps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      selected: {},
    };

    this.onChange = this.onChange.bind(this);
    this.maxAmount = this.maxAmount.bind(this);
  }

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;

    const list = [];

    for (let i = 0; i < balances.length; i += 1) {
      list.push({
        value: balances[i].asset_code,
        label: balances[i].asset_code,
        ...balances[i],
      });
    }

    this.setState({
      list,
      selected: list[0],
    });
  }

  handleMax(values) {
    const { selected } = this.state;

    values.amount = selected.balance;
  }

  onChange(e) {
    this.setState({ selected: e });
  }

  async validateForm(values) {
    const { id } = this.props;
    const { selected } = this.state;

    const { activeAccount } = currentActiveAccount();

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

      if (selected.value === 'XLM') {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_type === 'native',
        );
      } else {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_code === selected.value,
        );
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      if (selected.value === 'XLM') {
        if (
          Number(selectedTokenBalance.balance || '0')
          < Number(values.amount) + activeAccount.maxXLM
        ) {
          errors.amount = `Insufficient ${selected.value} balance.`;
          hasError.amount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (Number(selectedTokenBalance.balance || '0') < Number(values.amount)) {
          errors.amount = `Insufficient ${selected.value} balance.`;
          hasError.amount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

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
    }

    if (!hasError.amount && !hasError.destination && selected.value) {
      const accountData = await getAccountData(values.destination);

      let isAccountNew = false;
      let checked = true;

      if (accountData.status === 404) {
        isAccountNew = true;

        if (selected.value !== 'XLM') {
          errors.destination = 'Inactive accounts cannot receive tokens.';
          hasError.destination = true;

          changeOperationAction(id, {
            checked: false,
          });

          checked = false;
        }
      } else if (accountData.status === 400) {
        errors.destination = 'Wrong.';
        hasError.destination = true;
      } else {
        const destinationTokens = accountData.balances || [];

        let selectedToken = destinationTokens.find((x) => x.asset_type === 'native');

        if (selected.value !== 'XLM') {
          selectedToken = destinationTokens.find(
            (x) => x.asset_code === selected.value,
          );
        }

        if (!selectedToken) {
          errors.destination = 'The destination account does not trust the asset you are attempting to send.';
          hasError.destination = true;

          changeOperationAction(id, {
            checked: false,
          });

          checked = false;
        } else {
          if (
            Number(selectedToken.limit)
            < Number(values.amount) + Number(selectedToken.balance)
          ) {
            errors.destination = 'The destination account balance would exceed the trust of the destination in the asset.';
            hasError.destination = true;

            changeOperationAction(id, {
              checked: false,
            });

            checked = false;
          }
        }
      }

      changeOperationAction(id, {
        checked,
        isAccountNew,
        amount: parseFloat(values.amount, 10).toFixed(7),
        destination: values.destination,
        asset: selected.value,
      });
    } else {
      changeOperationAction(id, {
        checked: false,
      });
    }

    return errors;
  }

  maxAmount() {
    const { selected } = this.state;
    const { activeAccount } = currentActiveAccount();
    const { balances } = activeAccount;

    let maxBalance;

    if (selected.value === 'XLM') {
      const xlmBalance = balances.find((x) => x.asset_type === 'native');

      maxBalance = parseFloat(xlmBalance.balance, 10) - xlmBalance.maxXLM;
    } else {
      maxBalance = balances.find((x) => x.asset_code === selected.value)
        .balance;
    }

    return maxBalance;
  }

  render() {
    const { list, selected } = this.state;

    return (
      <Form
        mutators={{
          setMax: (args, state, utils) => {
            const { activeAccount } = currentActiveAccount();
            const { balances } = activeAccount;

            let maxBalance;

            if (selected.value === 'XLM') {
              const xlmBalance = activeAccount.balances.find(
                (x) => x.asset_type === 'native',
              );

              maxBalance = arithmeticNumber(
                parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM,
              );
            } else {
              maxBalance = balances.find(
                (x) => x.asset_code === selected.value,
              ).balance;
            }

            utils.changeValue(state, 'amount', () => maxBalance);
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
                      setMax={() => {
                        form.mutators.setMax();
                      }}
                    />
                  </div>

                  <div className={styles.select}>
                    <SelectOption
                      items={list}
                      onChange={this.onChange}
                      variant="select-outlined"
                      defaultValue={list[0]}
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
  }
}

PaymentOps.propTypes = {};

export default PaymentOps;
