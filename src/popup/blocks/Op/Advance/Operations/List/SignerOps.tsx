import React from 'react';
import { StrKey } from 'stellar-sdk';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  signer: string;
  weight: string;
};

type AppProps = {
  id: string;
};

type HasError = {
  signer: boolean;
  weight: boolean;
};

const SignerOps = ({ id }: AppProps) => {
  const validateForm = (values: FormValidate) => {
    const errors: Partial<FormValidate> = {};
    const hasError = {} as HasError;

    if (!values.signer) {
      errors.signer = '';
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
      errors.weight = '';
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
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="signer">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Signer</label>
                <Input
                  type="text"
                  placeholder="G..."
                  size="medium"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="weight">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">Weight</label>
                <Input
                  type="number"
                  placeholder="1"
                  size="medium"
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

SignerOps.propTypes = {};

export default SignerOps;
