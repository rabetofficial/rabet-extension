import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, {Component} from 'react';
import { FORM_ERROR } from 'final-form';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Logo from 'Root/components/Logo';
import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import * as route from 'Root/staticRes/routes';
import {buttonSizes, buttonTypes, inputSize, inputTypes} from 'Root/staticRes/enum';

import styles from './styles.less';

class Login extends Component {
  async onSubmit (values) {
    console.log(values);
    // this.props.history.push('/home');

    return { password: 'unknown password' }
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
              onSubmit={ (values) => this.onSubmit(values) }
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
