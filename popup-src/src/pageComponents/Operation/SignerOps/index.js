import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import validateAddress from 'Root/helpers/validate/address';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class SignerOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    const hasError = {};

    if (!values.signer) {
      errors.signer = null;
      hasError.signer = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    } else {
      if (!validateAddress(values.signer)) {
        errors.signer = 'Invalid address.';
        hasError.signer = true;

        changeOperationAction(this.props.id, {
          checked: false,
        });
      }
    }

    if (!values.weight) {
      errors.weight = null;
      hasError.weight = true;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!hasError.signer && !hasError.weight) {
      changeOperationAction(this.props.id, {
        checked: true,
        signer: values.signer,
        weight: values.weight,
      });
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
                  <Field name="signer">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Signer</label>
                          <Input
                            type="text"
                            placeholder="G..."
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                            autoFocus
                          />
                        </div>
                    )}
                  </Field>
                  <Field name="weight">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Weight</label>
                          <Input
                            type="number"
                            placeholder="1"
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

SignerOps.propTypes = {
};

export default SignerOps;
