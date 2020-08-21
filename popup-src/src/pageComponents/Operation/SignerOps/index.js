import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import styles from './styles.less';

class SignerOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.signer) {
      errors.signer = 'Required';
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
