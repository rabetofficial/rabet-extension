import React from 'react';
import { StrKey } from '@stellar/stellar-sdk';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import controlNumberInput from 'popup/utils/controlNumberInput';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  trustor: string;
  code: string;
  authorize: string;
};

type AppProps = {
  id: string;
};

type HasError = {
  trustor: boolean;
  code?: boolean;
  authorize?: boolean;
};

const AllowTrustOps = ({ id }: AppProps) => {
  const { publicKey, ...account } = useActiveAccount();
  const assets = account.assets || [];

  const validateForm = (values: FormValidate) => {
    const errors = {} as FormValidate;
    const hasError: Partial<HasError> = {};

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
      const isOwnedAsset = assets.find(
        (x) =>
          x.asset_code === values.code &&
          x.asset_issuer === publicKey,
      );

      if (!isOwnedAsset) {
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

export default AllowTrustOps;
