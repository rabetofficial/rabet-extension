import classNames from 'classnames';
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
  sendMax: string | null;
  destAmount: string | null;
};

type AppProps = {
  id: string;
};

const PaymentReceiveOps = ({ id }: AppProps) => {
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
      sendMax: boolean;
      destAmount: boolean;
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
    } else if (!StrKey.isValidEd25519PublicKey(values.destination)) {
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

    if (!values.sendMax) {
      errors.sendMax = null;
      hasError.sendMax = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      let selectedTokenBalance;

      if (isNative(sendAsset)) {
        selectedTokenBalance = balances.find(nativeAsset);
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
          Number(values.sendMax, 10) + maxXLM + numSL
        ) {
          errors.sendMax = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendMax = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      } else {
        if (
          Number(selectedTokenBalance.balance || '0') <
          parseFloat(values.sendMax, 10) + numSL
        ) {
          errors.sendMax = `Insufficient ${sendAsset.value} balance.`;
          hasError.sendMax = true;

          changeOperationAction(id, {
            checked: false,
          });
        }
      }
    }

    if (!values.destAmount) {
      errors.destAmount = null;
      hasError.destAmount = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (
      !hasError.destination &&
      !hasError.sendMax &&
      !hasError.destAmount &&
      sendAsset.value &&
      destAsset.value
    ) {
      const destinationTokens = accountData.balances || [];

      let selectedToken = destinationTokens.find(nativeAsset);

      if (!isNative(destAsset)) {
        selectedToken = destinationTokens.find((x) =>
          matchAsset(x, destAsset),
        );
      } else {
        selectedToken.limit = 999999999;
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
          Number(selectedToken.limit) <
          Number(values.destAmount) + Number(selectedToken.balance)
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
        sendMax: parseFloat(values.sendMax, 10).toFixed(7),
        sendAsset,
        destAmount: parseFloat(values.destAmount, 10).toFixed(7),
        destAsset,
      });
    }

    return errors;
  };

  return (
    <Form
      mutators={{
        sendMaxMax: (a, s, u) => {
          u.changeValue(s, 'sendMax', () => getMaxBalance(sendAsset));
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
                    items={balances}
                    defaultValue={sendAsset}
                    onChange={onChangeSendAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
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
                    items={balances}
                    defaultValue={destAsset}
                    onChange={onChangeDestAsset}
                    variant="outlined"
                    width={99}
                    className="ml-2"
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
