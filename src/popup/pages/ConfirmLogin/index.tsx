import React from 'react';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import registerUserAction from '../../actions/user/register';
import Logo from '../../components/Logo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';

import styles from './styles.less';

type FormValues = {
  password?: string | null;
  confirm?: string | null;
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
      navigate(route.accountManagerPage);
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
      errors.password = null;
      hasError.password = true;
    } else if (values.password.length < 8) {
      hasError.password = true;
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!values.confirm) {
      errors.confirm = null;
      hasError.confirm = true;
    } else if (values.confirm.length < 8) {
      hasError.confirm = true;
      errors.confirm = 'Confirm password must be at least 8 characters.';
    }

    if (!hasError.password && !hasError.confirm) {
      if (values.password !== values.confirm) {
        errors.confirm = 'Passwords do not match.';
      }
    }

    return errors;
  };

  return (
    <div className="grid grid-cols-6 h-screen">
      <div className="grid col-start-2 col-span-4 justify-center bg-red-100">
        <Logo />
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
          render={({ submitError, handleSubmit, invalid }) => (
            <form
              className={classNames(styles.form, 'form')}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <div className="grid col-start-2 col-span-4 justify-center">
                <Field name="password">
                  {({ input, meta }) => (
                    <Input
                      type="password"
                      placeholder="Password"
                      size="large"
                      variant="password"
                      input={input}
                      meta={meta}
                    />
                  )}
                </Field>
              </div>

              <div className="grid grid-cols-1 ">
                <Field name="confirm">
                  {({ input, meta }) => (
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      size="large"
                      variant="password"
                      input={input}
                      meta={meta}
                    />
                  )}
                </Field>
              </div>

              {submitError && (
                <div className="error">{submitError}</div>
              )}
              <div className="grid grid-cols-1 ">
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  content="Continue"
                  style={{ marginTop: '32px' }}
                  disabled={invalid}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default ConfirmLogin;