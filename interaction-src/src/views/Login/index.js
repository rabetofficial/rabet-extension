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
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  onSubmit (values) {
    const destination = global.sessionStorage.getItem('destination');

    if (destination === 'sign') {
      global.chrome.runtime.sendMessage({
        type: 'RABET_EXTENSION_LOGIN_TO_SIGN',
        values,
        id: global.sessionStorage.getItem('generatedId'),
        destination,
        detail: {
          host: global.sessionStorage.getItem('host'),
          title: global.sessionStorage.getItem('title'),
        },
        xdr: {
          xdr: global.sessionStorage.getItem('xdr'),
          network: global.sessionStorage.getItem('network'),
        }
      }, (response) => {
        if (response.ok) {
          this.props.history.push('/confirm');
        } else {
          if (response.message === 'wrong-password') {
            this.setState({
              error: 'Wrong password.',
            });
          }
        }
      });
    } else {
      global.chrome.runtime.sendMessage({
        type: 'RABET_EXTENSION_LOGIN',
        values,
        id: global.sessionStorage.getItem('generatedId'),
        destination,
        detail: {
          host: global.sessionStorage.getItem('host'),
          title: global.sessionStorage.getItem('title'),
        }
      }, (response) => {
        if (response.ok) {
          sessionStorage.setItem('accountName', response.message.name);
          sessionStorage.setItem('accountPublicKey', response.message.publicKey);

          this.props.history.push('/contact-request');
        } else {
          if (response.message === 'wrong-password') {
            this.setState({
              error: 'Wrong password.',
            });
          }
        }
      });
    }
  }

  validateForm (values) {
  }

  componentDidMount() {
    hadLoggedBeforeAction()
    .then(hasLogged => {
      if (hasLogged) {
        const page = global.sessionStorage.getItem('page');

        this.props.history.push(page);
      }
    });
  }

  render() {
    const { error } = this.state;

    return (
        <div className="pure-g content">
          <div className="pure-u-1-1">
            <Logo/>
            <Form
              onSubmit={ (values) => this.onSubmit(values) }
              validate={ (values) => this.validateForm(values) }
              render={ ({handleSubmit, submitting, values, pristine, invalid}) => (
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

                      {error && <div className="error">{error}</div>}

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
