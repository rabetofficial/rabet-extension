import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  name: string;
  value: string;
};

type AppProps = {
  id: string;
};

const ManageDataOps = ({ id }: AppProps) => {
  const validateForm = (values: FormValidate) => {
    const errors: Partial<FormValidate> = {};

    const hasError = {
      name: false,
      value: false,
    };

    if (!values.name) {
      errors.name = '';
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
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="name">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Name</label>

                <Input
                  type="text"
                  placeholder="Name"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="value">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Value
                  <span className="label-optional"> (optional)</span>
                </label>

                <Input
                  type="text"
                  placeholder="John"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                />
              </>
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
