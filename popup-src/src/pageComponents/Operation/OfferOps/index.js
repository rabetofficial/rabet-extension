import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import randomNumber from 'Root/helpers/randomNumber';
import SelectOption from 'Root/components/SelectOption';
import currentActiveAccount from 'Root/helpers/activeAccount';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class OfferOps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sellingAsset: {},
      buyingAsset: {},
    };

    this.onChangeSellingAmount = this.onChangeSellingAmount.bind(this);
    this.onChangeBuyingAmount = this.onChangeBuyingAmount.bind(this);
  }

  onChangeSellingAmount(e) {
    this.setState({ sellingAsset: e });
  }

  onChangeBuyingAmount(e) {
    this.setState({ buyingAsset: e });
  }

  onSubmit (values) {
    console.warn(values);
  }

  async validateForm (values) {
    const errors = {};

    const { activeAccount, activeAccountIndex } = currentActiveAccount();


    if (!values.selling) {
      errors.selling = 'Required.';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      if (this.state.sellingAsset.value) {
        let selectedTokenBalance;

        if (this.state.sellingAsset.value === 'XLM') {
          selectedTokenBalance = activeAccount.balances.find(x => x.asset_type === 'native');
        } else {
          selectedTokenBalance = activeAccount.balances.find(x => x.asset_code === this.state.sellingAsset.value);
        }

        if (!selectedTokenBalance) {
          selectedTokenBalance = {
            balance: 0,
          };
        }

        if (Number(selectedTokenBalance.balance || '0') < values.selling) {
          errors.selling = `Insufficient ${this.state.sellingAsset.value} balance.`;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      }
    }

    if (!values.buying) {
      errors.buying = 'Required.';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      if (this.state.buyingAsset.value) {
        let selectedTokenBalance;

        if (this.state.buyingAsset.value === 'XLM') {
          selectedTokenBalance = activeAccount.balances.find(x => x.asset_type === 'native');
        } else {
          selectedTokenBalance = activeAccount.balances.find(x => x.asset_code === this.state.buyingAsset.value);
        }

        if (Number(selectedTokenBalance.limit || '0') < values.buying) {
          errors.buying = `The balance would exceed the trust of the account in the asset.`;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        }
      }
    }

    if (!errors.selling && !errors.buying && this.state.buyingAsset.value && this.state.sellingAsset.value) {
      changeOperationAction(this.props.id, {
        checked: true,
        buying: values.buying,
        offerId: values.offerId || randomNumber(8),
        selling: values.selling,
        buyingAsset: this.state.buyingAsset,
        sellingAsset: this.state.sellingAsset,
      });
    }

    return errors;
  }

  componentDidMount() {
    const { activeAccount, activeAccountIndex } = currentActiveAccount();

    const { balances } = activeAccount;

    const list = [];

    list.push({
      value: 'XLM',
      label: 'XLM',
      balance: activeAccount.balance,
      asset_type: "native",
    });

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

    this.setState({ list });
  }

  render() {
    const { list } = this.state;

    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="selling">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary max">Selling amount</label>

                            <Input
                              type="number"
                              placeholder="1"
                              size="input-medium"
                              input={ input }
                              meta={ meta }
                              variant="max"
                              setMax={() => {}}
                            />
                          </div>
                          <div className={ styles.select }>
                            <SelectOption
                              items={list}
                              defaultValue={list[0]}
                              onChange={ this.onChangeSellingAmount }
                              variant="select-outlined"
                              selected={this.state.sellingAsset}
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="buying">
                    {({input, meta}) => (
                        <div className="pure-g group">
                          <div className={ styles.selectInput }>
                            <label className="label-primary">Buying amount</label>
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
                              items={list}
                              defaultValue={list[0]}
                              onChange={ this.onChangeBuyingAmount }
                              variant="select-outlined"
                              selected={this.state.buyingAsset}
                            />
                          </div>
                        </div>
                    )}
                  </Field>
                  <Field name="offerId">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">
                            Offer ID
                            <span className="label-optional">{' '}(optional)</span>
                          </label>
                          <Input
                            type="number"
                            placeholder="12345"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
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

OfferOps.propTypes = {};

export default OfferOps;
