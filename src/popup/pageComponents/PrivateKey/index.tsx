import React from 'react';
import { Form, Field } from 'react-final-form';

import ArrowBack from 'popup/svgs/ArrowBack';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

export type FormValues = {
  key: string;
};

type PrivateKeyType = {
  onCancel: () => void;
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
};

const PrivateKey = ({
  onCancel,
  onSubmit,
  isModal,
}: PrivateKeyType) => {
  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.key) {
      errors.key = '';
    }

    return errors;
  };

  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ submitError, handleSubmit, pristine }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="key">
              {({ input, meta }) => (
                <div>
                  <label className="label-primary">Private key</label>
                  <Input
                    type="text"
                    size="medium"
                    placeholder="Private key"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </div>
              )}
            </Field>

            {submitError && <Error>{submitError}</Error>}

            {isModal ? (
              <ButtonContainer btnSize={100} justify="end" mt={135}>
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={onCancel}
                  style={{ marginRight: '7px' }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Import"
                  disabled={pristine}
                />
              </ButtonContainer>
            ) : (
              <S.ButtonContainer>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Import"
                  disabled={pristine}
                />
                <S.SecondButton>
                  <Button
                    variant="default"
                    size="medium"
                    content="Back"
                    onClick={onCancel}
                    startIcon={<ArrowBack />}
                  />
                </S.SecondButton>
              </S.ButtonContainer>
            )}
          </form>
        )}
      />
    </div>
  );
};

PrivateKey.defaultProps = {
  isModal: false,
};

export default PrivateKey;
