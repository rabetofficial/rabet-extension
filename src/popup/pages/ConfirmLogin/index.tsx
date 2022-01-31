import React from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Layout1 from 'popup/components/Layout1';
import RouteName from 'popup/staticRes/routes';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import registerUserAction from 'popup/actions/user/register';

type FormValues = {
  password?: string;
  confirm?: string;
};

const ConfirmLogin = () => {
  const navigate = useNavigate();

  const onSubmit = (values: FormValues) => {
    const errors: FormValues = {};

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
    const errors: FormValues = {};

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
    <Layout1 isDashboard={false}>
      <div>
        <Logo />
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
          render={({ submitError, handleSubmit, invalid }) => (
            <form
              className="mt-[51px]"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    type="password"
                    placeholder="Password"
                    size="medium"
                    variant="password"
                    input={input}
                    meta={meta}
                  />
                )}
              </Field>

              <Field name="confirm">
                {({ input, meta }) => (
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    size="medium"
                    variant="password"
                    input={input}
                    meta={meta}
                    style={{ marginTop: '14px' }}
                  />
                )}
              </Field>

              {submitError && (
                <div className="error">{submitError}</div>
              )}
              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Continue"
                style={{ marginTop: '20px' }}
                disabled={invalid}
              />
            </form>
          )}
        />
      </div>
    </Layout1>
  );
};

export default ConfirmLogin;
