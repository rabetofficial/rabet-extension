import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Horizon, StrKey } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';
import { ElementOption } from 'popup/models';
import matchAsset from 'popup/utils/matchAsset';
import Input from 'popup/components/common/Input';
import getAccountData from 'popup/api/getAccount';
import getMaxBalance from 'popup/utils/maxBalance';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import controlNumberInput from 'popup/utils/controlNumberInput';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  destination: string | null;
  sendAmount: string | null;
  destMin: string | null;
};

type AppProps = {
  id: string;
};

type HasError = {
  destination: boolean;
  sendAmount: boolean;
  destMin: boolean;
};

const PaymentSendOps = ({ id }: AppProps) => {
  const account = useActiveAccount();

  const assets = account.assets || [];
  const mappedAssets = assets.map((asset) => ({
    label: asset.asset_code || 'XLM',
    value: asset,
  }));

  const [sendAsset, setSendAsset] = useState(mappedAssets[0]);
  const [destAsset, setDestAsset] = useState(mappedAssets[0]);

  const onChangeSendAsset = (
    e: ElementOption<Horizon.HorizonApi.BalanceLine>,
  ) => setSendAsset(e);
  const onChangeDestAsset = (
    e: ElementOption<Horizon.HorizonApi.BalanceLine>,
  ) => setDestAsset(e);

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      sendAsset: sendAsset.value,
      destAsset: destAsset.value,
    };

    let accountData: Horizon.AccountResponse | null = null;

    const errors = {} as FormValidate;
    const hasError = {} as HasError;

    if (!values.destination) {
      errors.destination = '';
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (!StrKey.isValidEd25519PublicKey(values.destination)) {
      errors.destination = 'Invalid destination.';
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      accountData = await getAccountData(values.destination);

      if (!accountData) {
        errors.destination = 'Inactive destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.sendAmount) {
      errors.sendAmount = '';
      hasError.sendAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (new BN(values.sendAmount).isLessThanOrEqualTo('0')) {
      errors.sendAmount = 'Amount must be higher than 0.';
      hasError.sendAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (
        !isInsufficientAsset(
          values.sendAsset,
          account.subentry_count,
          values.sendAmount,
        )
      ) {
        errors.sendAmount = `Insufficient ${
          values.sendAsset.asset_code || 'XLM'
        } balance.`;
        hasError.sendAmount = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.destMin) {
      errors.destMin = '';
      hasError.destMin = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination &&
      !hasError.sendAmount &&
      !hasError.destMin &&
      values.sendAsset &&
      values.destAsset
    ) {
      const destinationAssets = accountData.balances || [];
      let selectedToken = destinationAssets.find(
        (x) => x.asset_type === 'native',
      );

      if (values.destAsset.asset_type !== 'native') {
        selectedToken = destinationAssets.find((x) =>
          matchAsset(x, values.destAsset),
        );
      }

      if (!selectedToken) {
        errors.destMin =
          'The destination account does not trust the asset you are attempting to send.';
        hasError.destMin = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else {
        if (
          selectedToken.asset_type !== 'native' &&
          new BN(selectedToken.limit).isLessThan(
            new BN(values.destMin).plus(selectedToken.balance),
          )
        ) {
          errors.destMin =
            'The destination account balance would exceed the trust of the destination in the asset.';
          hasError.destMin = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          changeOperationAction(id, {
            checked: true,
            destination: values.destination,
            sendAmount: parseFloat(values.sendAmount).toFixed(7),
            sendAsset: values.sendAsset,
            destMin: parseFloat(values.destMin).toFixed(7),
            destAsset: values.destAsset,
          });
        }
      }
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendAmountMax: (a, s, u) => {
          u.changeValue(s, 'sendAmount', () =>
            getMaxBalance(sendAsset.value, account),
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
          <Field name="destination">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Destination</label>

                <Input
                  type="text"
                  placeholder="G…"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="sendAmount">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Send amount
                </label>

                <div className="flex items-start pt-2">
                  <div className="basis-full">
                    <Input
                      noMT
                      type="number"
                      placeholder="1"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      styleType="light"
                      className="grow"
                      onKeyPress={controlNumberInput}
                      setMax={form.mutators.sendAmountMax}
                    />
                  </div>

                  <SelectOption
                    items={mappedAssets}
                    onChange={onChangeSendAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    defaultValue={sendAsset}
                    selected={sendAsset}
                  />
                </div>
              </>
            )}
          </Field>

          <Field name="destMin">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Destination min
                </label>

                <div className="flex items-start pt-2">
                  <div className="basis-full">
                    <Input
                      noMT
                      type="number"
                      placeholder="1"
                      size="medium"
                      styleType="light"
                      className="grow"
                      input={input}
                      meta={meta}
                      onKeyPress={controlNumberInput}
                    />
                  </div>

                  <SelectOption
                    items={mappedAssets}
                    onChange={onChangeDestAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    defaultValue={destAsset}
                    selected={destAsset}
                  />
                </div>
              </>
            )}
          </Field>

          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

export default PaymentSendOps;
