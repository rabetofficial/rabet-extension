import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import arithmeticNumber from '../../../helpers/arithmetic';
import SelectOption from '../../../components/SelectOption';
import currentActiveAccount from '../../../helpers/activeAccount';
import changeOperationAction from '../../../actions/operations/change';

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
      sellingAsset: list[0],
      buyingAsset: list[0],
    });
  }

  onChangeSellingAmount(e) {
    this.setState({ sellingAsset: e });
  }

  onChangeBuyingAmount(e) {
    this.setState({ buyingAsset: e });
  }

  async validateForm(values) {
    const { id } = this.props;
    const { sellingAsset, buyingAsset } = this.state;

    const errors = {};
    const hasError = {
      selling: false,
    };

    const { activeAccount } = currentActiveAccount();

    if (!values.selling) {
      errors.selling = null;
      hasError.selling = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (sellingAsset.value) {
        let selectedTokenBalance;

        if (sellingAsset.value === 'XLM') {
          selectedTokenBalance = activeAccount.balances.find(
            (x) => x.asset_type === 'native',
          );
        } else {
          selectedTokenBalance = activeAccount.balances.find(
            (x) => x.asset_code === sellingAsset.value,
          );
        }

        if (!selectedTokenBalance) {
          selectedTokenBalance = {
            balance: 0,
          };
        }

        if (sellingAsset.value === 'XLM') {
          if (
            Number(selectedTokenBalance.balance || '0')
            < Number(values.selling) + activeAccount.maxXLM
          ) {
            errors.selling = `Insufficient ${sellingAsset.value} balance.`;
            hasError.selling = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        } else {
          if (Number(selectedTokenBalance.balance || '0') < values.selling) {
            errors.selling = `Insufficient ${sellingAsset.value} balance.`;
            hasError.selling = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        }
      }
    }

    if (!values.buying) {
      errors.buying = null;
      hasError.buying = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (buyingAsset.value) {
        let selectedTokenBalance;

        if (buyingAsset.value === 'XLM') {
          selectedTokenBalance = activeAccount.balances.find(
            (x) => x.asset_type === 'native',
          );
        } else {
          selectedTokenBalance = activeAccount.balances.find(
            (x) => x.asset_code === buyingAsset.value,
          );
        }

        if (buyingAsset.value !== 'XLM') {
          if (Number(selectedTokenBalance.limit || '0') < values.buying) {
            errors.buying = 'The balance would exceed the trust of the account in the asset.';
            hasError.buying = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        }
      }
    }

    if (
      !hasError.selling
      && !hasError.buying
      && buyingAsset.value
      && sellingAsset.value
    ) {
      changeOperationAction(id, {
        checked: true,
        buying: parseFloat(values.buying, 10).toFixed(7),
        offerId: values.offerId || 0,
        selling: parseFloat(values.selling, 10).toFixed(7),
        buyingAsset,
        sellingAsset,
      });
    }

    return errors;
  }

  render() {
    const { offer } = this.props;
    const { list, sellingAsset, buyingAsset } = this.state;

    return (
      <Form
        mutators={{
          sellingMax: (args, state, utils) => {
            const { activeAccount } = currentActiveAccount();
            const { balances } = activeAccount;

            let maxBalance;

            if (sellingAsset.value === 'XLM') {
              const xlmBalance = activeAccount.balances.find(
                (x) => x.asset_type === 'native',
              );

              maxBalance = arithmeticNumber(
                parseFloat(xlmBalance.balance, 10) - activeAccount.maxXLM,
              );
            } else {
              maxBalance = balances.find(
                (x) => x.asset_code === sellingAsset.value,
              ).balance;
            }

            utils.changeValue(state, 'selling', () => maxBalance);
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
            <Field name="selling">
              {({ input, meta }) => (
                <div className="pure-g group">
                  <div className={styles.selectInput}>
                    <label className="label-primary max">Selling amount</label>

                    <Input
                      type="number"
                      placeholder="1"
                      size="input-medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      setMax={() => {
                        form.mutators.sellingMax();
                      }}
                      autoFocus
                    />
                  </div>
                  <div className={styles.select}>
                    <SelectOption
                      items={list}
                      defaultValue={list[0]}
                      onChange={this.onChangeSellingAmount}
                      variant="select-outlined"
                      selected={sellingAsset}
                    />
                  </div>
                </div>
              )}
            </Field>
            <Field name="buying">
              {({ input, meta }) => (
                <div className="pure-g group">
                  <div className={styles.selectInput}>
                    <label className="label-primary">Buying amount</label>
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
                      onChange={this.onChangeBuyingAmount}
                      variant="select-outlined"
                      selected={buyingAsset}
                    />
                  </div>
                </div>
              )}
            </Field>
            {offer ? (
              <Field name="offerId">
                {({ input, meta }) => (
                  <div className="group">
                    <label className="label-primary">
                      Offer ID
                      <span className="label-optional"> (optional)</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="12345"
                      size="input-medium"
                      input={input}
                      meta={meta}
                    />
                  </div>
                )}
              </Field>
            ) : (
              ''
            )}
            {submitError && <div className="error">{submitError}</div>}
          </form>
        )}
      />
    );
  }
}

OfferOps.propTypes = {};

export default OfferOps;
