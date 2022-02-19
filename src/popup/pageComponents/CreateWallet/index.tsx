import React from 'react';
import { Form, Field } from 'react-final-form';

import ArrowBack from 'popup/svgs/ArrowBack';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';

import * as S from './styles';

export type FormValues = {
  name: string;
};

type CreateWalletType = {
  children?: React.ReactNode;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
};

const CreateWallet = ({
  children,
  onCancel,
  onSubmit,
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
      {children}
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
                <S.InputContainer>
                  <label className="label-primary">Wallet name</label>
                  <Input
                    type="text"
                    size="medium"
                    placeholder="John"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </S.InputContainer>
              )}
            </Field>

            {submitError && <Error>{submitError}</Error>}

            <S.ButtonContainer>
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
            </S.ButtonContainer>
          </form>
        )}
      />
    </div>
  );
};

CreateWallet.defaultProps = {
  children: '',
};

export default CreateWallet;
