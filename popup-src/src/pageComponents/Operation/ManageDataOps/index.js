import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class ManageDataOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};

    if (!values.name) {
      errors.name = null;

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!values.value) {
      errors.value = 'Value is equired.';

      changeOperationAction(this.props.id, {
        checked: false,
      });
    }

    if (!errors.value && !errors.name) {
      changeOperationAction(this.props.id, {
        checked: true,
        name: values.name,
        value: values.value,
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
                  <Field name="name">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Name</label>
                          <Input
                            type="text"
                            placeholder="Name"
                            size="input-medium"
                            input={ input }
                            meta={ meta }
                            autoFocus
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
