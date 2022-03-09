import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  low: string | null;
  medium: string | null;
  high: string | null;
};

type AppProps = {
  id: string;
};

const ThresholdOps = ({ id }: AppProps) => {
  const validateForm = (values: FormValidate) => {
    type HasError = {
      low: boolean;
      medium: boolean;
      high: boolean;
    };

    const errors = {} as FormValidate;
    const hasError = {} as HasError;

    if (!values.low) {
      errors.low = null;
      hasError.low = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!values.medium) {
      errors.medium = null;
      hasError.medium = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!values.high) {
      errors.high = null;
      hasError.high = true;

      changeOperationAction(id, {
        checked: false,
      });
    }

    if (!hasError.low && !hasError.medium && !hasError.high) {
      changeOperationAction(id, {
        checked: true,
        low: values.low,
        medium: values.medium,
        high: values.high,
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
          <Field name="low">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Low threshold</label>

                <Input
                  type="number"
                  placeholder="0"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="medium">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Medium threshold
                </label>

                <Input
                  type="number"
                  placeholder="0"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                />
              </>
            )}
          </Field>

          <Field name="high">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  High threshold
                </label>

                <Input
                  type="number"
                  placeholder="0"
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

ThresholdOps.propTypes = {};

export default ThresholdOps;
