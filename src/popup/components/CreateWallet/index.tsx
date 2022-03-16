import React from 'react';
import { Form, Field } from 'react-final-form';

import { Usage } from 'popup/models';
import ArrowBack from 'popup/svgs/ArrowBack';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';

export type FormValues = {
  name: string;
};

type CreateWalletType = {
  children?: React.ReactNode;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
  isModal?: boolean;
  usage: Usage;
};

const CreateWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
  usage,
}: CreateWalletType) => {
  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = '';
    }

    return errors;
  };

  return (
    <div>
      {children && (
        <div
          style={{
            marginBottom: usage === 'extension' ? '28px' : '55px',
          }}
        >
          {children}
        </div>
      )}

      <Form
        onSubmit={onSubmit}
        validate={(values: FormValues) => validateForm(values)}
        render={({ submitError, handleSubmit, pristine }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="name">
              {({ input, meta }) => (
                <div style={{ marginTop: isModal ? '16px' : '0px' }}>
                  <label className="label-primary">Wallet name</label>
                  <Input
                    type="text"
                    size="medium"
                    placeholder="John"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </div>
              )}
            </Field>

            {submitError && <Error>{submitError}</Error>}

            {isModal || usage === 'extension' ? (
              <ButtonContainer
                btnSize={100}
                justify="end"
                mt={usage === 'extension' ? 28 : 203}
                gap={7}
              >
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={onCancel}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Create"
                  disabled={pristine}
                />
              </ButtonContainer>
            ) : (
              <div className="mt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Create"
                  disabled={pristine}
                />

                <Button
                  style={{ marginTop: '12px' }}
                  variant="default"
                  size="medium"
                  content="Back"
                  onClick={onCancel}
                  startIcon={<ArrowBack />}
                />
              </div>
            )}
          </form>
        )}
      />
    </div>
  );
};

CreateWallet.defaultProps = {
  children: '',
  isModal: false,
};

export default CreateWallet;
