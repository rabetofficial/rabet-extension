import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import hadLoggedBeforeAction from '../../actions/hadLoggedBeforeAction';
import {
  buttonSizes,
  buttonTypes,
  inputSize,
  inputTypes,
} from '../../staticRes/enum';

import styles from './styles.less';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    hadLoggedBeforeAction().then((hasLogged) => {
      if (hasLogged) {
        const page = global.sessionStorage.getItem('page');

        navigate(page);
      }
    });
  }, []);

  const onSubmit = (values) => {
    const destination = global.sessionStorage.getItem('destination');

    if (destination === 'sign') {
      global.chrome.runtime.sendMessage(
        {
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
          },
        },
        (rp) => {
          const response = JSON.parse(rp);

          if (response.ok) {
            sessionStorage.setItem(
              'accountPublicKey',
              response.message.publicKey,
            );
            navigate('/confirm');
          } else {
            if (response.message === 'wrong-password') {
              setError('Wrong password.');
            }
          }
        },
      );
    } else {
      global.chrome.runtime.sendMessage(
        {
          type: 'RABET_EXTENSION_LOGIN',
          values,
          id: global.sessionStorage.getItem('generatedId'),
          destination,
          detail: {
            host: global.sessionStorage.getItem('host'),
            title: global.sessionStorage.getItem('title'),
          },
        },
        (rp) => {
          const response = JSON.parse(rp);

          if (response.ok) {
            sessionStorage.setItem(
              'accountName',
              response.message.name,
            );
            sessionStorage.setItem(
              'accountPublicKey',
              response.message.publicKey,
            );

            navigate('/contact-request');
          } else {
            if (response.message === 'wrong-password') {
              setError('Wrong password.');
            }
          }
        },
      );
    }
  };

  return (
    <div className="pure-g content">
      <div className="pure-u-1-1">
        <Logo />
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={() => () => {}}
          render={({ handleSubmit, submitting, pristine }) => (
            <form
              className={classNames(styles.form, 'form')}
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    type="password"
                    placeholder="Password"
                    size={inputSize.large}
                    variant={inputTypes.passVisible}
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                )}
              </Field>

              {error && <div className="error">{error}</div>}

              <Button
                type="submit"
                variant={buttonTypes.primary}
                size={buttonSizes.large}
                content="Unlock"
                style={{ marginTop: '32px' }}
                disabled={pristine || submitting}
              />
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default Login;
