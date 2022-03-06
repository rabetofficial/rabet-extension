import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import controlNumberInput from 'popup/utils/controlNumberInput';
import Input from 'popup/components/common/Input';
import SelectAssetModal from 'popup/blocks/Op/Basic/SelectAsset';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import Button from 'popup/components/common/Button';
import { Usage } from 'popup/models';

import ModalInput from './styles';

type FormValues = {
  amount: number;
  asset: any;
  destination: string;
  memo: string;
};

type AppProps = {
  usage: Usage;
};

const BasicSend = ({ usage }: AppProps) => {
  const navigate = useNavigate();

  const onSubmit = async (v: FormValues) => {
    if (usage === 'extension') {
      // navigate()
    } else {
      console.warn('hello');
    }
  };

  const currencies = Array(5).fill({
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

  const [selectedAsset, setSelectedAsset] = useState(currencies[0]);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ form, invalid, pristine, handleSubmit }) => (
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
                    currencies={currencies}
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
                    placeholder="G..."
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
              {/* disabled={invalid || pristine} */}
            </ButtonContainer>
          </form>
        )}
      />
    </>
  );
};

export default BasicSend;
