import classNames from 'classnames';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import isNative from '../../../utils/isNative';
import matchAsset from '../../../utils/matchAsset';
import nativeAsset from '../../../utils/nativeAsset';
import getMaxBalance from '../../../utils/maxBalance';
import SelectOption from '../../../components/SelectOption';
import currentActiveAccount from '../../../utils/activeAccount';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

const OfferOps = ({ id, offer }) => {
  const { activeAccount: { balances, maxXLM } } = currentActiveAccount();

  const [sellingAsset, setSellingAsset] = useState(balances[0]);
  const [buyingAsset, setByingAsset] = useState(balances[0]);

  const onChangeSellingAmount = (e) => setSellingAsset(e);
  const onChangeBuyingAmount = (e) => setByingAsset(e);

  const validateForm = async (values) => {
    const errors = {};
    const hasError = {
      selling: false,
    };

    if (!values.selling) {
      errors.selling = null;
      hasError.selling = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (sellingAsset.value) {
        let selectedTokenBalance;

        if (isNative(sellingAsset)) {
          selectedTokenBalance = balances.find(nativeAsset);
        } else {
          selectedTokenBalance = balances.find((x) => matchAsset(x, sellingAsset));
        }

        if (!selectedTokenBalance) {
          selectedTokenBalance = {
            balance: 0,
          };
        }

        const { selling_liabilities } = selectedTokenBalance;
        const numSL = Number(selling_liabilities);

        if (isNative(sellingAsset)) {
          if (
            Number(selectedTokenBalance.balance || '0')
            < Number(values.selling) + maxXLM + numSL
          ) {
            errors.selling = `Insufficient ${sellingAsset.value} balance.`;
            hasError.selling = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        } else {
          if (Number(selectedTokenBalance.balance || '0') < values.selling + numSL) {
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

        if (isNative(buyingAsset)) {
          selectedTokenBalance = balances.find(
            (x) => x.asset_type === 'native',
          );
        } else {
          selectedTokenBalance = balances.find((x) => matchAsset(x, buyingAsset));
        }

        if (!isNative(buyingAsset)) {
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
  };

  return (
    <Form
      mutators={{
        sellingMax: (a, s, u) => {
          u.changeValue(s, 'selling', () => getMaxBalance(sellingAsset));
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
                    setMax={form.mutators.sellingMax}
                    autoFocus
                  />
                </div>
                <div className={styles.select}>
                  <SelectOption
                    items={balances}
                    defaultValue={sellingAsset}
                    onChange={onChangeSellingAmount}
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
                    items={balances}
                    defaultValue={buyingAsset}
                    onChange={onChangeBuyingAmount}
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
};

export default OfferOps;
