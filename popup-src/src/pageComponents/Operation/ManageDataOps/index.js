import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import styles from './styles.less';

class ManageDataOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.key) {
      errors.key = 'Required';
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
                  <Field name="key">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Key</label>
                          <Input
                            type="text"
                            placeholder="First name"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                          />
                        </div>
                    )}
                  </Field>
                  <Field name="value">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Value</label>
                          <Input
                            type="text"
                            placeholder="John"
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

ManageDataOps.propTypes = {
};

export default ManageDataOps;
