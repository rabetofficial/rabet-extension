import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Horizon, StrKey, AccountResponse } from 'stellar-sdk';

import BN from 'helpers/BN';
import { ElementOption } from 'popup/models';
import matchAsset from 'popup/utils/matchAsset';
import Input from 'popup/components/common/Input';
import nativeAsset from 'popup/utils/nativeAsset';
import getMaxBalance from 'popup/utils/maxBalance';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import SelectOption from 'popup/components/common/SelectOption';
import getAccountData from 'popup/utils/horizon/isAddressFound';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  destination: string;
  sendMax: string;
  destAmount: string;
};

type AppProps = {
  id: string;
};

type HasError = {
  destination: boolean;
  sendMax: boolean;
  destAmount: boolean;
};

const PaymentReceiveOps = ({ id }: AppProps) => {
  const account = useActiveAccount();

  const assets = account.assets || [];
  const mappedAssets = assets.map((asset) => ({
    label: asset.asset_code || 'XLM',
    value: asset,
  }));

  const [sendAsset, setSendAsset] = useState(mappedAssets[0]);
  const [destAsset, setDestAsset] = useState(mappedAssets[0]);

  const onChangeSendAsset = (e: ElementOption<Horizon.BalanceLine>) =>
    setSendAsset(e);
  const onChangeDestAsset = (e: ElementOption<Horizon.BalanceLine>) =>
    setDestAsset(e);

  const validateForm = async (v: FormValidate) => {
    const values = {
      ...v,
      sendAsset: sendAsset.value,
      destAsset: destAsset.value,
    };

    let accountData: AccountResponse | null = null;

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

    if (!values.sendMax) {
      errors.sendMax = null;
      hasError.sendMax = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (
        !isInsufficientAsset(
          values.sendAsset,
          account.subentry_count,
          values.sendMax,
        )
      ) {
        errors.sendMax = `Insufficient ${
          values.sendAsset.asset_code || 'XLM'
        } balance.`;
        hasError.sendMax = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.destAmount) {
      errors.destAmount = '';
      hasError.destAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination &&
      !hasError.sendMax &&
      !hasError.destAmount &&
      values.sendAsset &&
      values.destAsset
    ) {
      const destinationTokens = accountData.balances || [];

      let selectedToken = destinationTokens.find(nativeAsset);

      if (values.destAsset.asset_type !== 'native') {
        selectedToken = destinationTokens.find((x) =>
          matchAsset(x, destAsset),
        );
      }

      if (!selectedToken) {
        errors.destination =
          'The destination account does not trust the asset you are attempting to send.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else {
        if (
          selectedToken.asset_type !== 'native' &&
          new BN(selectedToken.limit).isLessThan(
            new BN(values.destAmount).plus(selectedToken.balance),
          )
        ) {
          errors.destination =
            'The destination account balance would exceed the trust of the destination in the asset.';
          hasError.destination = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }

      changeOperationAction(id, {
        checked: true,
        destination: values.destination,
        sendMax: parseFloat(values.sendMax).toFixed(7),
        sendAsset: sendAsset.value,
        destAmount: parseFloat(values.destAmount).toFixed(7),
        destAsset: destAsset.value,
      });
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendMaxMax: (a, s, u) => {
          u.changeValue(s, 'sendMax', () =>
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

          <Field name="sendMax">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">Send max</label>

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
                    setMax={form.mutators.sendMaxMax}
                  />
                  <SelectOption
                    items={mappedAssets}
                    defaultValue={sendAsset}
                    onChange={onChangeSendAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
                    selected={sendAsset}
                  />
                </div>
              </>
            )}
          </Field>

          <Field name="destAmount">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Destination amount
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
                    defaultValue={destAsset}
                    onChange={onChangeDestAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
                    indicatorSize="small"
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

export default PaymentReceiveOps;
