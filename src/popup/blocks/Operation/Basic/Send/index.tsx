import React, { useState } from 'react';
import { StrKey } from 'stellar-sdk';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Input from 'popup/components/common/Input';
import getMaxBalance from 'popup/utils/maxBalance';
import Button from 'popup/components/common/Button';
import validateMemo from 'popup/utils/validate/memo';
import isTransferable from 'popup/utils/isTransferable';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import controlNumberInput from 'popup/utils/controlNumberInput';
import getAccountData from 'popup/utils/horizon/isAddressFound';
import SelectAssetModal from 'popup/blocks/Operation/Basic/SelectAssetModal';
import isInsufficientAsset from 'popup/utils/isInsufficientAsset';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import ModalInput from './styles';

type FormValues = {
  amount: number;
  asset: any;
  destination: string;
  memo: string;
};

const Send = () => {
  const navigate = useNavigate();
  const [isAccountNew, setIsAccountNew] = useState(false);
  const account = useActiveAccount();

  const assets = account.assets || [];

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const onSubmit = async (v: FormValues) => {
    const values = {
      ...v,
      asset: selectedAsset,
      isAccountNew,
    };

    navigate(RouteName.BasicSendConfirm, {
      state: {
        values,
      },
    });
  };

  const validateForm = async (v: FormValues) => {
    const values = {
      ...v,
      asset: selectedAsset,
    };

    if (values.memo && !validateMemo(values.memo)) {
      return {
        memo: 'Memo should not be more than 28 characters.',
      };
    }

    if (!values.destination) {
      return {
        destination: null,
      };
    }

    if (!StrKey.isValidEd25519PublicKey(values.destination)) {
      return {
        destination: 'Invalid destination.',
      };
    }

    if (!values.amount) {
      return {
        amount: null,
      };
    }

    if (!isInsufficientAsset(selectedAsset, 0, values.amount)) {
      return {
        amount: `Insufficient ${selectedAsset.asset_code} balance.`,
      };
    }

    if (selectedAsset.asset_issuer === values.destination) {
      return {};
    }

    const destinationAccount = await getAccountData(
      values.destination,
    );

    const [transferableResult, resultCode] = isTransferable(
      values,
      destinationAccount,
    );

    if (!transferableResult && resultCode === 0) {
      return {
        destination: 'Inactive accounts cannot receive tokens.',
      };
    }

    if (!transferableResult && resultCode === 1) {
      return {
        destination: 'Invalid destination.',
      };
    }

    if (!transferableResult && resultCode === 2) {
      return {
        destination:
          'The destination account does not trust the asset you are attempting to send.',
      };
    }

    if (!transferableResult && resultCode === 3) {
      return {
        destination:
          'The destination account balance would exceed the trust of the destination in the asset.',
      };
    }

    setIsAccountNew(resultCode === 0);

    return {};
  };

  return (
    <>
      <Form
        mutators={{
          setMax: (a, s, u) => {
            u.changeValue(s, 'amount', () =>
              getMaxBalance(selectedAsset),
            );
          },
        }}
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ form, invalid, pristine, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="label-primary mt-4">Amount</label>
            <ModalInput>
              <div className="flex flex-col">
                <Field name="amount">
                  {({ input, meta }) => (
                    <Input
                      type="number"
                      placeholder="123"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      setMax={form.mutators.setMax}
                      onKeyPress={controlNumberInput}
                    />
                  )}
                </Field>
              </div>

              <Field name="asset">
                {() => (
                  <SelectAssetModal
                    currencies={assets}
                    onChange={setSelectedAsset}
                  />
                )}
                {/* input={input} */}
                {/* meta={meta} */}
                {/* max */}
                {/* form={form} */}
              </Field>
            </ModalInput>

            <Field name="destination">
              {({ input, meta }) => (
                <>
                  <label className="label-primary mt-4">
                    Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="medium"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <Field name="memo">
              {({ input, meta }) => (
                <>
                  <label className="label-primary mt-4">
                    Memo{' '}
                    <span className="label-optional">(optional)</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="medium"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <ButtonContainer btnSize={100} justify="end" mt={40}>
              <Button
                type="button"
                variant="default"
                size="medium"
                content="Cancel"
                onClick={() => {
                  navigate(-1);
                }}
              />

              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Send"
                disabled={invalid || pristine}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </>
  );
};

export default Send;
