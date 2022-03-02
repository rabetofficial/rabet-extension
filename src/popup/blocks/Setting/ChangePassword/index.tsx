import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import PageTitle from 'popup/components/PageTitle';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import changeMasterPassword from 'popup/actions/options/changeMasterPassword';

import * as S from './styles';

export type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirm: string;
};

type ChangePasswordProps = {
  onClose: () => void;
};

const ChangePassword = ({ onClose }: ChangePasswordProps) => {
  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    const hasError = {
      oldPassword: false,
      newPassword: false,
      confirm: false,
    };

    if (!values.oldPassword) {
      errors.oldPassword = '';
      hasError.oldPassword = true;
    }

    if (!values.newPassword) {
      errors.newPassword = '';
      hasError.newPassword = true;
    } else if (values.newPassword.length < 8) {
      hasError.newPassword = true;
      errors.newPassword =
        'New password must be at least 8 characters.';
    }

    if (!hasError.oldPassword && !hasError.newPassword) {
      if (values.newPassword !== values.confirm) {
        errors.confirm = 'Passwords do not match.';
      }
    }

    return errors;
  };

  const onSubmit = async (values: FormValues) => {
    const result = await changeMasterPassword(values);

    if (result === 'wrong_password') {
      return {
        oldPassword: 'Password is incorrect.',
      };
    }

    if (result === 'failed') {
      return {
        newPassword: 'Could not change password. Try again.',
      };
    }

    onClose();

    return {};
  };

  return (
    <div style={{ width: '80%' }}>
      <PageTitle
        isSetting
        padding="0"
        onClose={onClose}
        title="Change Password"
      />

      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({ submitError, handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="oldPassword">
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

            <Field name="newPassword">
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
              />
            </ButtonContainer>
          </form>
        )}
      />
    </div>
  );
};

export default ChangePassword;
