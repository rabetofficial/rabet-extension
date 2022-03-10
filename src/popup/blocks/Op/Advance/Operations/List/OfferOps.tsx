import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import isNative from 'popup/utils/isNative';
import matchAsset from 'popup/utils/matchAsset';
import nativeAsset from 'popup/utils/nativeAsset';
import getMaxBalance from 'popup/utils/maxBalance';
import SelectOption from 'popup/components/common/SelectOption';
import changeOperationAction from 'popup/actions/operations/change';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import { ElementOption } from 'popup/models';

type FormValidate = {
  selling: string | null;
  buying: string | null;
  offerId: string | null;
};

type AppProps = {
  id: string;
  offer: boolean;
};

const OfferOps = ({ id, offer }: AppProps) => {
  const { maxXLM } = useActiveAccount();

  const balances = Array(5).fill({
    asset_code: 'XLM',
    asset_issuer: '123',
    last_modified_ledger: '234',
    limit: '567',
    is_authorized: false,
    is_authorized_to_maintain_liabilities: true,
    logo: '',
    domain: 'Stellar.org',
    toNative: 1,
  });

  const [sellingAsset, setSellingAsset] = useState(balances[0]);
  const [buyingAsset, setByingAsset] = useState(balances[0]);

  const onChangeSellingAmount = (e: ElementOption) =>
    setSellingAsset(e);
  const onChangeBuyingAmount = (e: ElementOption) => setByingAsset(e);

  const validateForm = async (values: FormValidate) => {
    type HasError = {
      selling: boolean;
      buying?: boolean;
      offerId?: boolean;
    };

    const errors = {} as FormValidate;
    const hasError: HasError = {
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
          selectedTokenBalance = balances.find((x) =>
            matchAsset(x, sellingAsset),
          );
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
            Number(selectedTokenBalance.balance || '0') <
            Number(values.selling) + maxXLM + numSL
          ) {
            errors.selling = `Insufficient ${sellingAsset.value} balance.`;
            hasError.selling = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        } else {
          if (
            Number(selectedTokenBalance.balance || '0') <
            values.selling + numSL
          ) {
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
          selectedTokenBalance = balances.find((x) =>
            matchAsset(x, buyingAsset),
          );
        }

        if (!isNative(buyingAsset)) {
          if (
            Number(selectedTokenBalance.limit || '0') < values.buying
          ) {
            errors.buying =
              'The balance would exceed the trust of the account in the asset.';
            hasError.buying = true;

            changeOperationAction(id, {
              checked: false,
            });
          }
        }
      }
    }

    if (
      !hasError.selling &&
      !hasError.buying &&
      buyingAsset.value &&
      sellingAsset.value
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
          u.changeValue(s, 'selling', () =>
            getMaxBalance(sellingAsset),
          );
        },
      }}
      onSubmit={() => {}}
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit, form }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="selling">
            {({ input, meta }) => (
              <>
                <label className="label-primary max">
                  Selling amount
                </label>

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1"
                    size="medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    className="grow"
                    styleType="light"
                    setMax={form.mutators.sellingMax}
                    autoFocus
                  />
                  <SelectOption
                    items={balances}
                    defaultValue={sellingAsset}
                    onChange={onChangeSellingAmount}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    selected={sellingAsset}
                  />
                </div>
              </>
            )}
          </Field>

          <Field name="buying">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Buying amount
                </label>

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1"
                    size="medium"
                    className="grow"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                  <SelectOption
                    items={balances}
                    defaultValue={buyingAsset}
                    onChange={onChangeBuyingAmount}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    selected={buyingAsset}
                  />
                </div>
              </>
            )}
          </Field>

          {offer ? (
            <Field name="offerId">
              {({ input, meta }) => (
                <>
                  <label className="label-primary mt-2">
                    Offer ID
                    <span className="label-optional">
                      {' '}
                      (optional)
                    </span>
                  </label>

                  <Input
                    type="number"
                    placeholder="12345"
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                </>
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
