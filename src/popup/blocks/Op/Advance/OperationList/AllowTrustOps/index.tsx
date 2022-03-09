import React from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from 'popup/components/common/Input';
import currentActiveAccount from 'popup/utils/activeAccount';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  trustor: string | null;
  code: string | null;
  authorize: string | null;
};

type AppProps = {
  id: string;
};

const AllowTrustOps = ({ id }: AppProps) => {
  const validateForm = (values: FormValidate) => {
    type HasError = {
      trustor: boolean;
      code?: boolean;
      authorize?: boolean;
    };

    const { activeAccount } = currentActiveAccount();

    const errors = {} as FormValidate;
    const hasError: HasError = {
      trustor: false,
    };

    if (!values.trustor) {
      errors.trustor = null;
      hasError.trustor = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      if (!StrKey.isValidEd25519PublicKey(values.trustor)) {
        errors.trustor = 'Invalid trustor.';
        hasError.trustor = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.code) {
      errors.code = null;
      hasError.code = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const balances = activeAccount.balances || [];

      const ownedAsset = balances.find(
        (x) =>
          x.asset_code === values.code &&
          x.asset_issuer === activeAccount.publicKey,
      );

      if (!ownedAsset) {
        errors.code = 'You do not own this asset.';
        hasError.code = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!values.authorize) {
      errors.authorize = null;
      hasError.authorize = true;

      changeOperationAction(id, {
        checked: false,
      });
    } else {
      const auth = parseInt(values.authorize, 10);

      if (![0, 1, 2].includes(auth)) {
        errors.authorize = 'Authorize must be 0 or 1 or 2';
        hasError.authorize = true;

        changeOperationAction(id, {
          checked: false,
        });
      }
    }

    if (!hasError.trustor && !hasError.code && !hasError.authorize) {
      changeOperationAction(id, {
        checked: true,
        assetCode: values.code,
        trustor: values.trustor,
        authorize: values.authorize,
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
          <Field name="trustor">
            {({ input, meta }) => (
              <>
                <label className="label-primary">Trustor</label>
                <Input
                  type="text"
                  placeholder="G..."
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </>
            )}
          </Field>

          <Field name="code">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Assets code
                </label>
                <Input
                  type="text"
                  placeholder="BTC"
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                />
              </>
            )}
          </Field>

          <Field name="authorize">
            {({ input, meta }) => (
              <>
                <label className="label-primary mt-2">
                  Authorize
                </label>
                <Input
                  type="number"
                  placeholder="0 | 1 | 2"
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

export default AllowTrustOps;
