import classNames from 'classnames';
import React from 'react';
import { Form, Field } from 'react-final-form';
import { StrKey } from 'stellar-sdk';

import Input from '../../../components/Input';
import currentActiveAccount from '../../../utils/activeAccount';
import changeOperationAction from '../../../actions/operations/change';

import styles from './styles.less';

const AllowTrustOps = ({ id }) => {
  const validateForm = (values) => {
    const { activeAccount } = currentActiveAccount();

    const errors = {};
    const hasError = {
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
      validate={(values) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className={classNames(styles.form, 'form')}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="trustor">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Trustor</label>
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
          <Field name="code">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Assets code</label>
                <Input
                  type="text"
                  placeholder="BTC"
                  size="input-medium"
                  input={input}
                  meta={meta}
                />
              </div>
            )}
          </Field>
          <Field name="authorize">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">Authorize</label>
                <Input
                  type="number"
                  placeholder="0 | 1 | 2"
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

export default AllowTrustOps;
