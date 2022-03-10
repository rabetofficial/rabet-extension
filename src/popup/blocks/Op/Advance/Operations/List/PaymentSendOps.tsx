import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from 'popup/components/common/Input';
import isNative from 'popup/utils/isNative';
import matchAsset from 'popup/utils/matchAsset';
import nativeAsset from 'popup/utils/nativeAsset';
import getMaxBalance from 'popup/utils/maxBalance';
import SelectOption from 'popup/components/common/SelectOption';
import getAccountData from 'popup/utils/horizon/isAddressFound';
import changeOperationAction from 'popup/actions/operations/change';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import { ElementOption } from 'popup/models';

type FormValidate = {
  destination: string | null;
  sendAmount: string | null;
  destMin: string | null;
};

type AppProps = {
  id: string;
};

const PaymentSendOps = ({ id }: AppProps) => {
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

  const [sendAsset, setSendAsset] = useState(balances[0]);
  const [destAsset, setDestAsset] = useState(balances[0]);

  const onChangeSendAsset = (e: ElementOption) => setSendAsset(e);
  const onChangeDestAsset = (e: ElementOption) => setDestAsset(e);

  const validateForm = async (values: FormValidate) => {
    type HasError = {
      destination: boolean;
      sendAmount: boolean;
      destMin: boolean;
    };

    let accountData;

    const errors = {} as FormValidate;
    const hasError = {} as HasError;

    if (!values.destination) {
      errors.destination = null;
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (!StrKey.isValidEd25519SecretSeed(values.destination)) {
      errors.destination = 'Invalid destination.';
      hasError.destination = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      accountData = await getAccountData(values.destination);

      if (accountData.status === 404) {
        errors.destination = 'Inactive destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      } else if (accountData.status === 400) {
        errors.destination = 'Wrong destination.';
        hasError.destination = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.sendAmount) {
      errors.sendAmount = null;
      hasError.sendAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(sendAsset)) {
        const xlmBalance = balances.find(nativeAsset);

        selectedTokenBalance = xlmBalance;
      } else {
        selectedTokenBalance = balances.find((x) =>
          matchAsset(x, sendAsset),
        );
      }

      if (!selectedTokenBalance) {
        selectedTokenBalance = {
          balance: 0,
        };
      }

      const { selling_liabilities } = selectedTokenBalance;
      const numSL = Number(selling_liabilities);

      if (isNative(sendAsset)) {
        if (
          Number(selectedTokenBalance.balance || '0') <
          Number(values.sendAmount, 10) + maxXLM + numSL
        ) {
          errors.sendAmount = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') <
          parseFloat(values.sendAmount, 10) + numSL
        ) {
          errors.sendAmount = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendAmount = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destMin) {
      errors.destMin = null;
      hasError.destMin = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination &&
      !hasError.sendAmount &&
      !hasError.destMin &&
      sendAsset.value &&
      destAsset.value
    ) {
      const destinationTokens = accountData.balances || [];
      let selectedToken = destinationTokens.find(
        (x) => x.asset_type === 'native',
      );

      if (!isNative(destAsset)) {
        selectedToken = destinationTokens.find((x) =>
          matchAsset(x, destAsset),
        );
      } else {
        selectedToken.limit = 999999999;
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
          Number(selectedToken.limit) <
          Number(values.destMin) + Number(selectedToken.balance)
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
            sendAmount: parseFloat(values.sendAmount, 10).toFixed(7),
            sendAsset,
            destMin: parseFloat(values.destMin, 10).toFixed(7),
            destAsset,
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
            getMaxBalance(sendAsset),
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

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1"
                    size="medium"
                    input={input}
                    meta={meta}
                    variant="max"
                    styleType="light"
                    className="grow"
                    setMax={form.mutators.sendAmountMax}
                  />
                  <SelectOption
                    items={balances}
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

                <div className="flex items-center">
                  <Input
                    type="number"
                    placeholder="1"
                    size="medium"
                    styleType="light"
                    className="grow"
                    input={input}
                    meta={meta}
                  />
                  <SelectOption
                    items={balances}
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
