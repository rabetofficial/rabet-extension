import React from 'react';
import { Form, Field } from 'react-final-form';

import BN from 'helpers/BN';
import Input from 'popup/components/common/Input';
import controlNumberInput from 'popup/utils/controlNumberInput';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  low: string;
  medium: string;
  high: string;
};

type AppProps = {
  id: string;
};

type HasError = {
  low: boolean;
  medium: boolean;
  high: boolean;
};

const ThresholdOps = ({ id }: AppProps) => {
  const validateForm = (values: FormValidate) => {
    const errors = {} as FormValidate;
    const hasError = {} as HasError;

    if (!values.low) {
      errors.low = '';
      hasError.low = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const l = new BN(values.low);
      if (!l.isInteger() || l.isNaN()) {
        errors.low = 'Invalid number';
        hasError.low = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.medium) {
      errors.medium = '';
      hasError.medium = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const m = new BN(values.medium);
      if (!m.isInteger() || m.isNaN()) {
        errors.medium = 'Invalid number';
        hasError.medium = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.high) {
      errors.high = '';
      hasError.high = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const h = new BN(values.high);
      if (!h.isInteger() || h.isNaN()) {
        errors.high = 'Invalid number';
        hasError.high = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
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
                  onKeyPress={controlNumberInput}
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
                  onKeyPress={controlNumberInput}
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
                  onKeyPress={controlNumberInput}
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
