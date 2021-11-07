import PropTypes from 'prop-types';
import classNames from 'classnames';
import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../../components/Input';
import validateDomain from '../../../utils/validate/domain';
import validateNumber from '../../../utils/validate/number';
import validateAddress from '../../../utils/validate/address';
import * as operationNames from '../../../staticRes/operations';
import getAccountData from '../../../utils/horizon/isAddressFound';
import changeOperationAction from '../../../actions/operations/change';

const SetOptionOps = ({
  id,
  type,
  label,
  inputInfo,
}) => {
  const validateForm = async (values) => {
    const errors = {};
    const hasError = {};

    if (!values.value) {
      changeOperationAction(id, {
        checked: false,
      });

      errors.value = null;
      hasError.value = true;
    }

    if (!hasError.value) {
      if (type === operationNames.bumpSequence) {
        if (!validateNumber(values.value)) {
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
        if (values.value && !validateAddress(values.value)) {
          changeOperationAction(id, {
            checked: false,
            destination: values.value,
          });

          errors.value = 'Invalid destination.';
          hasError.value = true;
        } else {
          const accountData = await getAccountData(values.destination);

          if (accountData.status === 404) {
            errors.value = 'You cannot merge your account to an inactive account.';
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

        if (!validateNumber(values.value)) {
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
        if (!validateAddress(values.value)) {
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

        if (!validateNumber(values.value)) {
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
        if (!validateDomain(values.value)) {
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
        if (!validateNumber(values.value)) {
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
      validate={(values) => validateForm(values)}
      render={({ submitError, handleSubmit }) => (
        <form className={classNames('form')} onSubmit={handleSubmit} autoComplete="off">
          <Field name="value">
            {({ input, meta }) => (
              <div className="group">
                <label className="label-primary">{label}</label>
                <Input
                  type={inputInfo.type}
                  placeholder={inputInfo.placeholder}
                  size="input-medium"
                  input={input}
                  meta={meta}
                  autoFocus
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

SetOptionOps.propTypes = {
  label: PropTypes.string.isRequired,
  inputInfo: PropTypes.object.isRequired,
};

export default SetOptionOps;
