import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class ThresholdOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};

    if (!values.low) {
      errors.low = null;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!values.medium) {
      errors.medium = null;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!values.high) {
      errors.high = null;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!errors.low && !errors.medium && !errors.high) {
      changeOperationAction(this.props.id, {
        checked: true,
        low: values.low,
        medium: values.medium,
        high: values.high,
      });
    }

    return errors;
  }

  render() {
    return (
        <Form
          onSubmit={ (values) => this.onSubmit(values) }
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
                            autoFocus
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
                            placeholder="2"
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
                            placeholder="3"
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
