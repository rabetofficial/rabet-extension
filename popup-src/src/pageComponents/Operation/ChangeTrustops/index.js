import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import styles from './styles.less';

class ChangeTrustOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.code) {
      errors.code = 'Required';
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
                          <label className="label-primary">Limit</label>
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
