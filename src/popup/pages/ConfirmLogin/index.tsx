import React from 'react';
import styled from 'styled-components';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/common/Layouts/BaseLayout';
import RouteName from 'popup/staticRes/routes';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import registerUserAction from 'popup/actions/user/register';

type FormValues = {
  password: string;
  confirm: string;
};

const ConfirmLogin = () => {
  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (values.password !== values.confirm) {
      errors.password = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    registerUserAction(values.password).then(() => {
      navigate(RouteName.AccountManager);
    });

    return {};
  };

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
    <Layout isDashboard={false}>
      <div>
        <Logo />

        <Form
          onSubmit={onSubmit}
          validate={validateForm}
          render={({ submitError, handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} autoComplete="off">
              <InputContainer>
                <Field name="password">
                  {({ input, meta }) => (
                    <Input
                      type="password"
                      placeholder="Password"
                      size="medium"
                      variant="password"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  )}
                </Field>

                <Field name="confirm">
                  {({ input, meta }) => (
                    <ConfirmInput>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        size="medium"
                        variant="password"
                        input={input}
                        meta={meta}
                        style={{ marginTop: '20px' }}
                      />
                    </ConfirmInput>
                  )}
                </Field>

                {submitError && <Error>{submitError}</Error>}
              </InputContainer>
              <ButtonContainer>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Continue"
                  disabled={invalid}
                />
              </ButtonContainer>
            </form>
          )}
        />
      </div>
    </Layout>
  );
};
const InputContainer = styled.div`
  margin-top: 70px;
  @media (max-width: 360px) {
    margin-top: 50px;
  }
`;
const ConfirmInput = styled.div`
  margin-top: 20px;
  @media (max-width: 360px) {
    margin-top: 24px;
  }
`;
const ButtonContainer = styled.div`
  margin-top: 32px;
  @media (max-width: 360px) {
    margin-top: 40px;
  }
`;

export default ConfirmLogin;
