import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import classNames from 'classnames';
import Input from 'Root/components/Input';
import styles from './styles.less';

class AllowTrustOps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeButton: 'false',
    };
    this.toggleBtn = this.toggleBtn.bind(this);
  }

  toggleBtn(value) {
    this.setState({ activeButton: value });
  }

  onSubmit (values) {
    console.warn(values);
  }

  validateForm (values) {
    const errors = {};
    if (!values.trustor) {
      errors.trustor = 'Required';
    }
    return errors;
  }

  render() {
    const buttons = [{name: 'True', value: 'true'}, {name: 'False', value: 'false'}];
    return (
        <Form
          onSubmit={ this.onSubmit }
          validate={ (values) => this.validateForm(values) }
          render={ ({submitError, handleSubmit, submitting, values}) => (
                <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                  <Field name="trustor">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Trustor</label>
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
                  <Field name="code">
                    {({input, meta}) => (
                        <div className="group">
                          <label className="label-primary">Assets code</label>
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
                  <div className="group">
                    <label className="label-primary">Authorize</label>
                    <div className={ styles.buttons }>
                      {buttons.map((item, index) => (
                          <button
                            key={ index }
                            type="button"
                            className={ this.state.activeButton === item.value ? 'active' : '' }
                            onClick={ () => this.toggleBtn(item.value) }
                          >
                            {item.name}
                          </button>
                      ))}
                    </div>
                  </div>
                  {submitError && <div className="error">{submitError}</div>}
                </form>
            ) }
        />
    );
  }
}

AllowTrustOps.propTypes = {
};

export default AllowTrustOps;
