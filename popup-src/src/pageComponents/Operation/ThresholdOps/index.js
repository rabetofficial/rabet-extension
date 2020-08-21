import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import styles from './styles.less';

class ThresholdOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.low) {
      errors.low = 'Required';
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
                  <Field name="low">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Low threshold</label>
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
                  <Field name="medium">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Medium threshold</label>
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
                  <Field name="high">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">High threshold</label>
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

ThresholdOps.propTypes = {
};

export default ThresholdOps;
