import classNames from 'classnames';
import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../../../components/Input';
import changeOperationAction from '../../../../../actions/operations/change';

import styles from './styles.less';

const ManageDataOps = ({ id }) => {
  const validateForm = (values) => {
    const errors = {};

    const hasError = {
      name: false,
      value: false,
    };

    if (!values.name) {
      errors.name = null;
      hasError.name = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (values.name.length > 64) {
        errors.name = 'Enter a name with less than 64 characters.';
        hasError.name = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (values.value && values.value.length > 64) {
      errors.value = 'Enter a value with less than 64 characters.';
      hasError.value = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!hasError.value && !hasError.name) {
      changeOperationAction(id, {
        checked: true,
        name: values.name,
        value: values.value || null,
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
          <Field name="name">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Name</label>
                <Input
                  type="text"
                  placeholder="Name"
                  size="input-medium"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </div>
            )}
          </Field>

          <Field name="value">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">
                  Value
                  <span className="label-optional"> (optional)</span>
                </label>
                <Input
                  type="text"
                  placeholder="John"
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

ManageDataOps.propTypes = {};

export default ManageDataOps;
