import { StrKey } from 'stellar-sdk';
import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import { Usage } from 'popup/models';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import controlNumberInput from 'popup/utils/controlNumberInput';
import SelectAssetModal from 'popup/blocks/Op/Basic/SelectAsset';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import ModalSend from 'popup/pages/expand/EHome/BasicOperation/ModalSend';

import ModalInput from './styles';

type FormValues = {
  memo: string;
  amount: string;
  destination: string;
};

type AppProps = {
  usage: Usage;
};

const BasicSend = ({ usage }: AppProps) => {
  const navigate = useNavigate();
  const account = useActiveAccount();
  const [isModalOpen, setModal] = useState(false);

  const assets = account.assets || [];

  const [selectedAsset, setSelectedAsset] = useState(assets[0]);

  const onSubmit = async (v: FormValues) => {
    if (usage === 'extension') {
      // navigate()
    } else {
      setModal(true);
    }
  };

  const validateForm = (v: FormValues) => {
    const values = {
      ...v,
      asset: selectedAsset,
    };

    if (values.memo && values.memo.length > 28) {
      return {
        memo: 'Memo should not be more than 28 characters.',
      };
    }

    if (!values.destination) {
      return {
        destination: '',
      };
    }

    if (!StrKey.isValidEd25519PublicKey(values.destination)) {
      return {
        destination: 'Invalid destination.',
      };
    }

    if (!values.amount) {
      return {
        amount: '',
      };
    }

    if (selectedAsset.asset_issuer === values.destination) {
      return {};
    }

    return {};
  };

  return (
    <>
      <Form
        validate={validateForm}
        onSubmit={onSubmit}
        render={({ form, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <label className="label-primary block mt-4">Amount</label>
            <ModalInput>
              <div className="flex flex-col grow">
                <Field name="amount">
                  {({ input, meta }) => (
                    <Input
                      type="number"
                      placeholder="123"
                      size="medium"
                      input={input}
                      meta={meta}
                      variant="max"
                      styleType="light"
                      setMax={form.mutators.setMax}
                      onKeyPress={controlNumberInput}
                    />
                  )}
                </Field>
              </div>

              <Field name="asset">
                {() => (
                  <SelectAssetModal
                    usage={usage}
                    assets={assets}
                    onChange={setSelectedAsset}
                  />
                )}
              </Field>
            </ModalInput>

            <Field name="destination">
              {({ input, meta }) => (
                <>
                  <label className="label-primary block mt-4">
                    Destination
                  </label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <Field name="memo">
              {({ input, meta }) => (
                <>
                  <label className="label-primary block mt-4">
                    Memo
                    <span className="label-optional">
                      {' '}
                      (optional)
                    </span>
                  </label>
                  <Input
                    type="text"
                    placeholder="My friend"
                    size="medium"
                    styleType="light"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            <ButtonContainer
              btnSize={100}
              justify="end"
              positionStyles={{
                bottom: usage === 'extension' ? '22px' : '32px',
              }}
              mt={40}
            >
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
                className="mr-[-11px]"
              />
            </ButtonContainer>

            <ModalSend
              isOpen={isModalOpen}
              onClose={() => {
                setModal(false);
              }}
            />
          </form>
        )}
      />
    </>
  );
};

export default BasicSend;
