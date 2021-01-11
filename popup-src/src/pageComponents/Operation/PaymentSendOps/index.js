import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import SelectOption from 'Root/components/SelectOption';
import validateAddress from 'Root/helpers/validate/address';
import currentActiveAccount from 'Root/helpers/activeAccount';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class PaymentSendOps extends Component {
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

  onChangeSendAsset(e) {
    this.setState({ sendAsset: e });
  }

  onChangeDestAsset(e) {
    this.setState({ destAsset: e });
  }

  onSubmit (values) {
    console.warn(values);
  }

  async validateForm (values) {
    let accountData;
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const errors = {};
    const hasError = {};

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
    } else {
      accountData = await getAccountData(values.destination);

      if (accountData.status === 404) {
        errors.destination = 'Inactive destination.';
        hasError.destination = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else if (accountData.status === 400) {
        errors.destination = 'Wrong destination.';
        hasError.destination = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      }
    }

    if (!values.sendAmount) {
      errors.sendAmount = null;
      hasError.sendAmount = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (this.state.sendAsset.value === 'XLM') {
        const xlmBalance = activeAccount.balances.find(x => x.asset_type === 'native');

        selectedTokenBalance = xlmBalance;
      } else {
        selectedTokenBalance = activeAccount.balances.find(x => x.asset_code === this.state.sendAsset.value);
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      if (this.state.sendAsset.value === 'XLM') {
        if (Number(selectedTokenBalance.balance || '0') < Number(values.sendAmount, 10) + activeAccount.maxXLM) {
          errors.sendAmount = `Insufficient ${this.state.sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      } else {
        if (Number(selectedTokenBalance.balance || '0') < parseFloat(values.sendAmount, 10)) {
          errors.sendAmount = `Insufficient ${this.state.sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destMin) {
      errors.destMin = null;
      hasError.destMin = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!hasError.destination && !hasError.sendAmount && !hasError.destMin && this.state.sendAsset.value && this.state.destAsset.value) {
      const destinationTokens = accountData.balances || [];
      let selectedToken = destinationTokens.find(x => x.asset_type === 'native');

      if (this.state.destAsset.value !== 'XLM') {
        selectedToken = destinationTokens.find(x => x.asset_code === this.state.destAsset.value);
      } else {
        selectedToken.limit = 999999999;
      }

      if (!selectedToken) {
        errors.destMin = 'The destination account does not trust the asset you are attempting to send.';
        hasError.destMin = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else {
        if (Number(selectedToken.limit) < Number(values.destMin) + Number(selectedToken.balance)) {
          errors.destMin = 'The destination account balance would exceed the trust of the destination in the asset.';
          hasError.destMin = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          changeOperationAction(this.props.id, {
            checked: true,
            destination: values.destination,

            sendAmount: parseFloat(values.sendAmount, 10).toFixed(7),
            sendAsset: this.state.sendAsset,

            destMin: parseFloat(values.destMin, 10).toFixed(7),
            destAsset: this.state.destAsset,
          });
        }
      }
    }

    return errors;
  }


  componentDidMount() {
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const { balances } = activeAccount;

    const list = [];

    for (let i = 0; i < balances.length; i++) {
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

  render() {
    const { list } = this.state;

    return (
        <Form
          mutators={{
            sendAmountMax: (args, state, utils) => {
              const { activeAccount } = currentActiveAccount();
              const { balances } = activeAccount;

              let maxBalance;

              if (this.state.sendAsset.value === 'XLM') {
                let xlmBalance = activeAccount.balances.find(x => x.asset_type === 'native');

                maxBalance = parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM;
              } else {
                maxBalance = balances.find(x => x.asset_code === this.state.sendAsset.value).balance;
              }

              utils.changeValue(state, 'sendAmount', () => maxBalance);
            },
          }}
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({ submitError, handleSubmit, submitting, values, form }) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="destination">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Destination</label>
                          <Input
                            type="text"
                            placeholder="G…"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                            autoFocus
                          />
                        </div>
                    )}
                  </Field>
                  <Field name="sendAmount">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary">Send amount</label>
                            <Input
                              type="number"
                              placeholder="1"
                              size="input-medium"
                              input={ input }
                              meta={ meta }
                              variant="max"
                              setMax={() => { form.mutators.sendAmountMax() }}
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                              items={ list }
                              onChange={ this.onChangeSendAsset }
                              variant="select-outlined"
                              defaultValue={list[0]}
                              selected={this.state.sendAsset}
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="destMin">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary">Destination min</label>
                            <Input
                              type="number"
                              placeholder="1"
                              size="input-medium"
                              input={ input }
                              meta={ meta }
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                              items={ list }
                              onChange={ this.onChangeDestAsset }
                              variant="select-outlined"
                              defaultValue={list[0]}
                              selected={this.state.destAsset}
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  {submitError && <div className="error">{submitError}</div>}
                </form>
            ) }
        />
    );
  }
}

PaymentSendOps.propTypes = {};

export default PaymentSendOps;
