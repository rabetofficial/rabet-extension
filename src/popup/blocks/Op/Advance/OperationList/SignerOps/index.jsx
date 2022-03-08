import classNames from 'classnames';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from '../../../../../components/Input';
import changeOperationAction from '../../../../../actions/operations/change';

import styles from './styles.less';

const SignerOps = ({ id }) => {
  const validateForm = (values) => {
    const errors = {};
    const hasError = {};

    if (!values.signer) {
      errors.signer = null;
      hasError.signer = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else if (!StrKey.isValidEd25519PublicKey(values.signer)) {
      errors.signer = 'Invalid signer.';
      hasError.signer = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!values.weight) {
      errors.weight = null;
      hasError.weight = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!hasError.signer && !hasError.weight) {
      changeOperationAction(id, {
        checked: true,
        signer: values.signer,
        weight: values.weight,
      });
    }

    return errors;
  };

  return (
    <Form
      onSubmit={() => {}}
      validate={(values) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className={classNames(styles.form, 'form')}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="signer">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Signer</label>
                <Input
                  type="text"
                  placeholder="G..."
                  size="input-medium"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </div>
            )}
          </Field>
          <Field name="weight">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Weight</label>
                <Input
                  type="number"
                  placeholder="1"
                  size="input-medium"
                  input={input}
                  meta={meta}
                />
              </div>
            )}
          </Field>
          {submitError && <div className="error">{submitError}</div>}
        </form>
      )}
    />
  );
};

SignerOps.propTypes = {};

export default SignerOps;
