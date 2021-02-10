import classNames from 'classnames';
import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Logo from 'Root/components/Logo';
import Input from 'Root/components/Input';
import Button from 'Root/components/Button';
import {buttonSizes, buttonTypes, inputSize, inputTypes} from 'Root/staticRes/enum';
import hadLoggedBeforeAction from 'Root/actions/hadLoggedBeforeAction';

import styles from './styles.less';

class Login extends Component {

  onSubmit (values) {
    global.chrome.runtime.sendMessage({
      type: 'RABET_EXTENSION_LOGIN',
      values,
      id: global.sessionStorage.getItem('generatedId')
    }, (response) => {
      if (response.ok) {
        sessionStorage.setItem('accountName', response.message.name);
        sessionStorage.setItem('accountPublicKey', response.message.publicKey);

        this.props.history.push('/contact-request');
      }
    });
  }

  validateForm (values) {

  }

  componentDidMount() {
    hadLoggedBeforeAction()
    .then(hasLogged => {
      console.log(hasLogged);
      if (hasLogged) {
        const page = global.sessionStorage.getItem('page');

        console.log(page);

        this.props.history.push(page);
      }
    });
  }

  render() {

    return (
        <div className="pure-g content">
          <div className="pure-u-1-1">
            <Logo/>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({submitError, handleSubmit, submitting, values, pristine, invalid}) => (
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
                        content="Unlock"
                        style={ {marginTop: '32px'} }
                        disabled={ pristine || submitting }
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
