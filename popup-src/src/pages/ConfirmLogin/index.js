import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import registerUserAction from 'Root/actions/user/register';
import Logo from 'Root/components/Logo';
import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import { buttonSizes, buttonTypes, inputSize, inputTypes } from 'Root/staticRes/enum';

import styles from './styles.less';

class ConfirmLogin extends Component {
  onSubmit(values) {
    const errors = {};

    if (values.password !== values.confirm) {
      errors.password = 'Passwords do not match.';
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    registerUserAction(values.password).then(() => {
      this.props.history.push(route.accountManagerPage);
    });
  }

  validateForm(values) {
    const errors = {};
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
  }

  render() {
    return (
      <div className="pure-g content">
        <div className="pure-u-1-1">
          <Logo />
          <Form
            onSubmit={(values) => this.onSubmit(values)}
            validate={(values) => this.validateForm(values)}
            render={({ submitError, handleSubmit, submitting, invalid, pristine }) => (
              <form
                className={classNames(styles.form, 'form')}
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <Field name="password">
                  {({ input, meta }) => (
                    <Input
                      type="password"
                      placeholder="Password"
                      size={inputSize.large}
                      variant={inputTypes.passVisible}
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
                      size={inputSize.large}
                      variant={inputTypes.passVisible}
                      input={input}
                      meta={meta}
                    />
                  )}
                </Field>
                {submitError && <div className="error">{submitError}</div>}
                <Button
                  type="submit"
                  variant={buttonTypes.primary}
                  size={buttonSizes.large}
                  content="Continue"
                  style={{ marginTop: '32px' }}
                  disabled={invalid}
                />
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

ConfirmLogin.propTypes = {};

export default ConfirmLogin;
