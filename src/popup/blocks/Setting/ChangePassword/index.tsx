import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import PageTitle from 'popup/components/PageTitle';

import * as S from './styles';

type FormValues = {
  password: string;
  confirm: string;
};
type ChangePasswordType = {
  onClose: () => void;
  onClick: () => void;
  onSubmit: () => void;
};
const ChangePassword = ({
  onClick,
  onClose,
  onSubmit,
}: ChangePasswordType) => {
  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    const hasError = {
      password: false,
      confirm: false,
    };

    if (!values.password) {
      errors.password = '';
      hasError.password = true;
    } else if (values.password.length < 8) {
      hasError.password = true;
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!values.confirm) {
      errors.confirm = '';
      hasError.confirm = true;
    } else if (values.confirm.length < 8) {
      hasError.confirm = true;
      errors.confirm =
        'Confirm password must be at least 8 characters.';
    }

    if (!hasError.password && !hasError.confirm) {
      if (values.password !== values.confirm) {
        errors.confirm = 'Passwords do not match.';
      }
    }

    return errors;
  };

  return (
    <div>
      <PageTitle isSetting title="Change Password" padding="0" />

      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ submitError, handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="password">
              {({ input, meta }) => (
                <div style={{ marginBottom: '32px' }}>
                  <S.Label>Old password</S.Label>
                  <Input
                    type="password"
                    placeholder="Enter old password"
                    size="medium"
                    variant="password"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>

            <Field name="password">
              {({ input, meta }) => (
                <div style={{ marginBottom: '24px' }}>
                  <S.Label>New password</S.Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    size="medium"
                    variant="password"
                    input={input}
                    meta={meta}
                  />
                </div>
              )}
            </Field>

            <Field name="confirm">
              {({ input, meta }) => (
                <>
                  <S.Label>Confirm new password</S.Label>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    size="medium"
                    variant="password"
                    input={input}
                    meta={meta}
                  />
                </>
              )}
            </Field>

            {submitError && <Error>{submitError}</Error>}

            <ButtonContainer btnSize={100} mt={32} justify="end">
              <Button
                variant="default"
                size="medium"
                content="Cancel"
                onClick={onClose}
                style={{ marginRight: '7px' }}
              />
              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Change"
                disabled={invalid}
                onClick={onClick}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </div>
  );
};

export default ChangePassword;
