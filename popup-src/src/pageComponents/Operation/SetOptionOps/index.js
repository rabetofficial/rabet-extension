import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import validateDomain from 'Root/helpers/validate/domain';
import validateNumber from 'Root/helpers/validate/number';
import validateAddress from 'Root/helpers/validate/address';
import * as operationNames from 'Root/staticRes/operations';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class SetOptionOps extends Component {
  onSubmit(values) {
    // console.warn(values);
  }

  async validateForm(values) {
    const { type } = this.props;

    const errors = {};
    const hasError = {};

    if (!values.value) {
      changeOperationAction(this.props.id, {
        checked: false,
      });

      errors.value = null;
      hasError.value = true;
    }

    if (!hasError.value) {
      if (type === operationNames.bumpSequence) {
        if (!validateNumber(values.value)) {
          changeOperationAction(this.props.id, {
            checked: false,
            bumpTo: values.value,
          });

          errors.value = null;
          hasError.value = true;
        } else {
          changeOperationAction(this.props.id, {
            checked: true,
            bumpTo: values.value,
          });
        }
      } else if (type === operationNames.accountMerge) {
        if (values.value && !validateAddress(values.value)) {
          changeOperationAction(this.props.id, {
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

            changeOperationAction(this.props.id, {
              checked: false,
            });
          } else {
            changeOperationAction(this.props.id, {
              checked: true,
              destination: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsSetFlags) {
        const flagNumber = parseInt(values.value, 10);

        if (!validateNumber(values.value)) {
          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          if (flagNumber < 1 || flagNumber > 15) {
            errors.value = 'Enter a number between 1 and 15';
            hasError.value = true;
          } else {
            changeOperationAction(this.props.id, {
              checked: true,
              setFlags: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsInflationDest) {
        if (!validateAddress(values.value)) {
          errors.value = 'Invalid destination.';
          hasError.value = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          changeOperationAction(this.props.id, {
            checked: true,
            destination: values.value,
          });
        }
      } else if (type === operationNames.setOptionsClearFlags) {
        const flagNumber = parseInt(values.value, 10);

        if (!validateNumber(values.value)) {
          errors.value = null;
          hasError.value = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          if (flagNumber < 1 || flagNumber > 15) {
            errors.value = 'Enter a number between 1 and 15';
            hasError.value = true;
          } else {
            changeOperationAction(this.props.id, {
              checked: true,
              clearFlags: values.value,
            });
          }
        }
      } else if (type === operationNames.setOptionsHomeDomain) {
        if (!validateDomain(values.value)) {
          errors.value = 'Invalid domain.';
          hasError.value = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          changeOperationAction(this.props.id, {
            checked: true,
            homeDomain: values.value,
          });
        }
      } else if (type === operationNames.setOptionsMasterWeight) {
        if (!validateNumber(values.value)) {
          errors.value = null;
          hasError.value = true;

          changeOperationAction(this.props.id, {
            checked: false,
          });
        } else {
          changeOperationAction(this.props.id, {
            checked: true,
            masterWeight: values.value,
          });
        }
      }
    }

    return errors;
  }

  render() {
    const {
      label,
      inputInfo: { type, placeholder },
    } = this.props;

    return (
      <Form
        onSubmit={this.onSubmit}
        validate={(values) => this.validateForm(values)}
        render={({ submitError, handleSubmit }) => (
          <form className={classNames(styles.form, 'form')} onSubmit={handleSubmit} autoComplete="off">
            <Field name="value">
              {({ input, meta }) => (
                <div className="group">
                  <label className="label-primary">{label}</label>
                  <Input
                    type={type}
                    placeholder={placeholder}
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
  }
}

SetOptionOps.propTypes = {
  label: PropTypes.string.isRequired,
  inputInfo: PropTypes.object.isRequired,
};

export default SetOptionOps;
