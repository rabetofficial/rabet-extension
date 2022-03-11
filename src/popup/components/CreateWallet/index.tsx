import React from 'react';
import { Form, Field } from 'react-final-form';

import ArrowBack from 'popup/svgs/ArrowBack';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

export type FormValues = {
  name: string;
};

type CreateWalletType = {
  children?: React.ReactNode;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
  isModal?: boolean;
};

const CreateWallet = ({
  children,
  onCancel,
  onSubmit,
  isModal,
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
      {children && <S.ChildContainer>{children}</S.ChildContainer>}

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

            {isModal ? (
              <ButtonContainer
                btnSize={100}
                justify="end"
                mt={203}
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