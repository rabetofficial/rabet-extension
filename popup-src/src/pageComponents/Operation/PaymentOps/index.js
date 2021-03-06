import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import SelectOption from 'Root/components/SelectOption';
import arithmeticNumber from 'Root/helpers/arithmetic';
import validateAddress from 'Root/helpers/validate/address';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

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

  onChange(e) {
    this.setState({ selected: e });
  }
  //
  onSubmit() {
    // console.warn(values);
    // console.log({
    //   destination: values.destination,
    //   amount: values.amount,
    //   asset: this.state.selected.value,
    // });
    /*
      values.destination
      values.amount
      this.state.selected
    */
  }

  handleMax(values) {
    values.amount = this.state.selected.balance;
  }

  async validateForm(values) {
    const { activeAccount } = currentActiveAccount();

    const errors = {};

    const hasError = {
      amount: false,
      destination: false,
    };

    if (!values.amount) {
      errors.amount = null;
      hasError.amount = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (this.state.selected.value === 'XLM') {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_type === 'native',
        );
      } else {
        selectedTokenBalance = activeAccount.balances.find(
          (x) => x.asset_code === this.state.selected.value,
        );
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      if (this.state.selected.value === 'XLM') {
        if (
          Number(selectedTokenBalance.balance || '0') <
          Number(values.amount) + activeAccount.maxXLM
        ) {
          errors.amount = `Insufficient ${this.state.selected.value} balance.`;
          hasError.amount = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      } else {
        if (Number(selectedTokenBalance.balance || '0') < Number(values.amount)) {
          errors.amount = `Insufficient ${this.state.selected.value} balance.`;
          hasError.amount = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destination) {
      errors.destination = null;
      hasError.destination = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else if (!validateAddress(values.destination)) {
      errors.destination = 'Invalid destination.';
      hasError.destination = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!hasError.amount && !hasError.destination && this.state.selected.value) {
      const accountData = await getAccountData(values.destination);

      let isAccountNew = false;
      let checked = true;

      if (accountData.status === 404) {
        isAccountNew = true;

        if (this.state.selected.value !== 'XLM') {
          errors.destination = 'Inactive accounts cannot receive tokens.';
          hasError.destination = true;

          changeOperationAction(this.props.id, {
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

        if (this.state.selected.value !== 'XLM') {
          selectedToken = destinationTokens.find(
            (x) => x.asset_code === this.state.selected.value,
          );
        }

        if (!selectedToken) {
          errors.destination =
            'The destination account does not trust the asset you are attempting to send.';
          hasError.destination = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });

          checked = false;
        } else {
          if (
            Number(selectedToken.limit) <
            Number(values.amount) + Number(selectedToken.balance)
          ) {
            errors.destination =
              'The destination account balance would exceed the trust of the destination in the asset.';
            hasError.destination = true;

            changeOperationAction(this.props.id, {
              checked: false,
            });

            checked = false;
          }
        }
      }

      changeOperationAction(this.props.id, {
        checked,
        isAccountNew,
        amount: parseFloat(values.amount, 10).toFixed(7),
        destination: values.destination,
        asset: this.state.selected.value,
      });
    } else {
      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    return errors;
  }

  maxAmount() {
    const { activeAccount } = currentActiveAccount();
    const { balances } = activeAccount;

    let maxBalance;

    if (this.state.selected.value === 'XLM') {
      let xlmBalance = balances.find((x) => x.asset_type === 'native');

      maxBalance = parseFloat(xlmBalance.balance, 10) - xlmBalance.maxXLM;
    } else {
      maxBalance = balances.find((x) => x.asset_code === this.state.selected.value)
        .balance;
    }

    return maxBalance;
  }

  componentDidMount() {
    const { activeAccount } = currentActiveAccount();

    const { balances } = activeAccount;

    const list = [];

    for (let i = 0; i < balances.length; i++) {
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

  render() {
    const { list } = this.state;

    return (
      <Form
        mutators={{
          setMax: (args, state, utils) => {
            const { activeAccount } = currentActiveAccount();
            const { balances } = activeAccount;

            let maxBalance;

            if (this.state.selected.value === 'XLM') {
              let xlmBalance = activeAccount.balances.find(
                (x) => x.asset_type === 'native',
              );

              maxBalance = arithmeticNumber(
                parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM,
              );
            } else {
              maxBalance = balances.find(
                (x) => x.asset_code === this.state.selected.value,
              ).balance;
            }

            utils.changeValue(state, 'amount', () => maxBalance);
          },
        }}
        onSubmit={this.onSubmit}
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
                      // setMax={() => { this.maxAmount() }}
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
                      selected={this.state.selected}
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
