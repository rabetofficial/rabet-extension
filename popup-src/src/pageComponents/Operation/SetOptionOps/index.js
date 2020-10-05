import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';

import Input from 'Root/components/Input';
import changeOperationAction from 'Root/actions/operations/change';

import styles from './styles.less';

class SetOptionOps extends Component {
  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const { type } = this.props;

    const errors = {};

    if (!values.value) {
      changeOperationAction(this.props.id, {
        checked: false,
      });

      errors.value = 'Required.';
    }

    if (!errors.value) {
      console.log(type);
      if (type === 'bumpSequence') {
        changeOperationAction(this.props.id, {
          checked: true,
          bumpTo: values.value,
        });
      }
    }

    return errors;
  }

  render() {
    const { label, inputInfo: { type, placeholder } } = this.props;

    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="value">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">{label}</label>
                          <Input
                            type={ type }
                            placeholder={ placeholder }
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

SetOptionOps.propTypes = {
  label: PropTypes.string.isRequired,
  inputInfo: PropTypes.object.isRequired,
};

export default SetOptionOps;
