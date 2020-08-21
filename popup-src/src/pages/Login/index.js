import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Form, Field } from 'react-final-form';
import { FORM_ERROR } from 'final-form';
import Button from 'Root/components/Button';
import {buttonSizes, buttonTypes, inputSize, inputTypes} from 'Root/staticRes/enum';
import {confirmLoginPage} from 'Root/staticRes/routes';
import Input from 'Root/components/Input';
import Logo from 'Root/components/Logo';
import styles from './styles.less';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit (values) {
    console.log(values);
    this.props.history.push('/home');
  }

  validateForm (values) {
    const errors = {};
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  }

  render() {
    return (
        <div className="pure-g content">
          <div className="pure-u-1-1">
            <Logo/>
            <Form
              onSubmit={ this.onSubmit }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, values}) => (
                    <form className={ classNames(styles.form, 'form') } onSubmit={ handleSubmit }>
                      <Field name="password">
                        {({input, meta}) => (
                          <Input
                            type="password"
                            placeholder="Password"
                            size={ inputSize.large }
                            variant={ inputTypes.passVisible }
                            input={ input }
                            meta={ meta }
                          />
                        )}
                      </Field>
                      {submitError && <div className="error">{submitError}</div>}
                      <Button
                        type="submit"
                        variant={ buttonTypes.primary }
                        size={ buttonSizes.large }
                        content="Login"
                        style={ {marginTop: '32px'} }
                        disabled={ submitting }
                        onClick={ () => {this.props.history.push('/home');} }
                      />
                    </form>
                ) }
            />
          </div>
        </div>
    );
  }
}

Login.propTypes = {

};

export default withRouter(Login);
