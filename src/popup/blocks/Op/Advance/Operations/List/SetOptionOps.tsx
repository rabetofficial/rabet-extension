import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { StrKey } from 'stellar-sdk';
import isValidDomain from 'is-valid-domain';
import { Form, Field } from 'react-final-form';

import BN from 'helpers/BN';
import Input from 'popup/components/common/Input';
import getAccountData from 'popup/api/getAccount';
import * as operationNames from 'popup/staticRes/operations';
import changeOperationAction from 'popup/actions/operations/change';

type FormValidate = {
  value: any;
  destination: string;
};

type InputInfo = {
  type: string;
  placeholder: string;
};

type AppProps = {
  id: string;
  type: string;
  label: string;
  inputInfo: InputInfo;
};

const SetOptionOps = ({ id, type, label, inputInfo }: AppProps) => {
  const validateForm = async (values: FormValidate) => {
    type HasError = {
      value: boolean;
    };

    const errors = {} as FormValidate;
    const hasError = {} as HasError;

    if (!values.value) {
      changeOperationAction(id, {
        checked: false,
      });

      errors.value = null;
      hasError.value = true;
    }

    if (!hasError.value) {
      if (type === operationNames.bumpSequence) {
        if (!new BN(values.value).isNaN()) {
          changeOperationAction(id, {
            checked: false,
            bumpTo: values.value,
          });

          errors.value = null;
          hasError.value = true;
        } else {
          changeOperationAction(id, {
            checked: true,
            bumpTo: values.value,
          });
        }
      } else if (type === operationNames.accountMerge) {
        if (
          values.value &&
          !StrKey.isValidEd25519PublicKey(values.value)
        ) {
          changeOperationAction(id, {
            checked: false,
            destination: values.value,
          });

          errors.value = 'Invalid destination.';
          hasError.value = true;
        } else {
          const accountData = await getAccountData(
            values.destination,
          );

          if (accountData.status === 404) {
            errors.value =
              'You cannot merge your account to an inactive account.';
            hasError.value = true;

            changeOperationAction(id, {
              checked: false,
            });
          } else {
            changeOperationAction(id, {
              checked: true,
              destination: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsSetFlags) {
        const flagNumber = parseInt(values.value, 10);

        if (!new BN(values.value).isNaN()) {
          changeOperationAction(id, {
            checked: false,
          });
        } else {
          if (flagNumber < 1 || flagNumber > 15) {
            errors.value = 'Enter a number between 1 and 15';
            hasError.value = true;
          } else {
            changeOperationAction(id, {
              checked: true,
              setFlags: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsInflationDest) {
        if (!StrKey.isValidEd25519PublicKey(values.value)) {
          errors.value = 'Invalid destination.';
          hasError.value = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          changeOperationAction(id, {
            checked: true,
            destination: values.value,
          });
        }
      } else if (type === operationNames.setOptionsClearFlags) {
        const flagNumber = parseInt(values.value, 10);

        if (!new BN(values.value).isNaN()) {
          errors.value = null;
          hasError.value = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          if (flagNumber < 1 || flagNumber > 15) {
            errors.value = 'Enter a number between 1 and 15';
            hasError.value = true;
          } else {
            changeOperationAction(id, {
              checked: true,
              clearFlags: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsHomeDomain) {
        if (!isValidDomain(values.value)) {
          errors.value = 'Invalid domain.';
          hasError.value = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          changeOperationAction(id, {
            checked: true,
            homeDomain: values.value,
          });
        }
      } else if (type === operationNames.setOptionsMasterWeight) {
        if (!new BN(values.value).isNaN()) {
          errors.value = null;
          hasError.value = true;

          changeOperationAction(id, {
            checked: false,
          });
        } else {
          changeOperationAction(id, {
            checked: true,
            masterWeight: values.value,
          });
        }
      }
    }

    return errors;
  };

  return (
    <Form
      onSubmit={() => {}}
      validate={(values: FormValidate) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form
          className={classNames('form')}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="value">
            {({ input, meta }) => (
              <>
                <label className="label-primary">{label}</label>
                <Input
                  type={inputInfo.type}
                  placeholder={inputInfo.placeholder}
                  size="medium"
                  styleType="light"
                  input={input}
                  meta={meta}
                  autoFocus
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

SetOptionOps.propTypes = {
  label: PropTypes.string.isRequired,
  inputInfo: PropTypes.object.isRequired,
};

export default SetOptionOps;
