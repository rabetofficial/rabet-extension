import { Horizon } from 'stellar-sdk';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import { ElementOption } from 'popup/models';
import Input from 'popup/components/common/Input';
import getMaxBalance from 'popup/utils/maxBalance';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import changeOperationAction from 'popup/actions/operations/change';
import BN from 'helpers/BN';

type FormValidate = {
  selling: string;
  buying: string;
  offerId: string;
};

type AppProps = {
  id: string;
  offer: boolean;
};

type HasError = {
  selling: boolean;
  buying?: boolean;
  offerId?: boolean;
};

const OfferOps = ({ id, offer }: AppProps) => {
  const account = useActiveAccount();

  const assets = account.assets || [];
  const mappedAssets = assets.map((asset) => ({
    label: asset.asset_code || 'XLM',
    value: asset,
  }));

  const [sellingAsset, setSellingAsset] = useState(mappedAssets[0]);
  const [buyingAsset, setByingAsset] = useState(mappedAssets[0]);

  const onChangeSellingAmount = (
    e: ElementOption<Horizon.BalanceLine>,
  ) => setSellingAsset(e);
  const onChangeBuyingAmount = (
    e: ElementOption<Horizon.BalanceLine>,
  ) => setByingAsset(e);

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      sellingAsset: sellingAsset.value,
      buyingAsset: buyingAsset.value,
    };

    const errors = {} as FormValidate;
    const hasError: HasError = {
      selling: false,
    };

    if (!values.selling) {
      errors.selling = '';
      hasError.selling = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (values.sellingAsset) {
        if (
          !isInsufficientAsset(
            values.sellingAsset,
            account.subentry_count,
            values.selling,
          )
        ) {
          errors.selling = `Insufficient ${
            values.sellingAsset.asset_code || 'XLM'
          } balance.`;
          hasError.selling = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

    if (!values.buying) {
      errors.buying = '';
      hasError.buying = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (values.buyingAsset) {
        if (values.buyingAsset.asset_type !== 'native') {
          if (
            new BN(values.buyingAsset.limit || '0').isLessThan(
              values.buying,
            )
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
        buying: parseFloat(values.buying).toFixed(7),
        offerId: values.offerId || 0,
        selling: parseFloat(values.selling).toFixed(7),
        buyingAsset: values.buyingAsset,
        sellingAsset: values.sellingAsset,
      });
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sellingMax: (a, s, u) => {
          u.changeValue(s, 'selling', () =>
            getMaxBalance(sellingAsset.value, account),
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
                    items={mappedAssets}
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
                    items={mappedAssets}
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
