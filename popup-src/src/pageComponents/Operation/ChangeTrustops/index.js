import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import validateNumber from 'Root/helpers/validate/number';
import assetExists from 'Root/helpers/horizon/assetExists';
import validateAddress from 'Root/helpers/validate/address';
import getAccountData from 'Root/helpers/horizon/isAddressFound';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class ChangeTrustOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  async validateForm (values) {
    const errors = {};

    let accountData;

    if (!values.code) {
      errors.code = 'Required.';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!values.issuer) {
      errors.issuer = 'Required.';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      if (!validateAddress(values.issuer)) {
        errors.issuer = 'Invalid address.';

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else {
        accountData = await getAccountData(values.issuer);

        if (accountData.status) {
          changeOperationAction(this.props.id, {
            checked: false,
          });

          errors.issuer = 'Address is inactive.';
        }
      }
    }

    if (values.limit && !validateNumber(values.limit)) {
      errors.limit = 'Not a number';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!errors.limit && !errors.issuer && !errors.code) {
      const assetExistsResult = await assetExists({
        code: values.code,
        issuer: values.issuer,
      });

      if (!assetExistsResult) {
        errors.code = 'Asset not found.';

        changeOperationAction(this.props.id, {
          checked: false,
        });
      } else {
        changeOperationAction(this.props.id, {
          checked: true,
          code: values.code,
          limit: values.limit,
          issuer: values.issuer,
        });
      }
    }

    return errors;
  }

  render() {
    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="code">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Assets code</label>
                          <Input
                            type="text"
                            placeholder="USD"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                            autoFocus
                          />
                        </div>
                    )}
                  </Field>

                  <Field name="issuer">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Assets issuer</label>
                          <Input
                            type="text"
                            placeholder="G…"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
                        </div>
                    )}
                  </Field>

                  <Field name="limit">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Limit
                            <span className="label-optional">{' '}(optional)</span>
                          </label>
                          <Input
                            type="number"
                            placeholder="1000"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
                        </div>
                    )}
                  </Field>
                  {submitError && <div className="error">{submitError}</div>}
                </form>
            ) }
        />
    );
  }
}

ChangeTrustOps.propTypes = {
};

export default ChangeTrustOps;
