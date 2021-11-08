import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import React, { useState, useEffect } from 'react';

import LoadingOne from '../LoadingOne';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import setTimer from '../../actions/options/setTimer';
import loginUserAction from '../../actions/user/login';
import hadLoggedBeforeAction from '../../actions/user/hadLoggedBeforeAction';
import {
  buttonSizes,
  buttonTypes,
  inputSize,
  inputTypes,
} from '../../staticRes/enum';

import styles from './styles.less';

const Login = ({ location }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const { state } = location;

  //   if (!state) {
  //     hadLoggedBeforeAction().then((hasLogged) => {
  //       if (hasLogged) {
  //         loginUserAction(hasLogged).then((isLogged) => {
  //           if (isLogged) {
  //             setLoading(false);

  //             navigate(route.accountManagerPage);
  //           }
  //         });
  //       } else {
  //         setLoading(false);
  //       }
  //     });
  //   }
  // }, []);

  const onSubmit = async (values) => {
    const isLogged = await loginUserAction(values.password);

    if (!isLogged) {
      return { password: 'Incorrect password.' };
    }

    await setTimer();

    return navigate(route.accountManagerPage);
  };

  const validateForm = () => {
    const errors = {};

    return errors;
  };

  if (loading) {
    return <LoadingOne />;
  }

  return (
    <div className="pure-g content">
      <div className="pure-u-1-1">
        <Logo />

        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
          render={({
            submitError,
            handleSubmit,
            submitting,
            pristine,
          }) => (
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

              {submitError && <div className="error">{submitError}</div>}

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
