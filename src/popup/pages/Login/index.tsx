import { Form, Field } from 'react-final-form';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import LoadingOne from '../LoadingOne';
import Logo from '../../components/Logo';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import * as route from '../../staticRes/routes';
import setTimer from '../../actions/options/setTimer';
import loginUserAction from '../../actions/user/login';
import hadLoggedBeforeAction from '../../actions/user/hadLoggedBeforeAction';
import Layout1 from '../../components/Layout1';

type FormValues = {
    password: string
}

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state) {
      hadLoggedBeforeAction().then((hasLogged: boolean) => {
        if (hasLogged) {
          loginUserAction(hasLogged).then((isLogged: boolean) => {
            if (isLogged) {
              setLoading(false);

              navigate(route.accountManagerPage);
            }
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, []);

  const onSubmit = async (values: FormValues) => {
    const isLogged = await loginUserAction(values.password);

    if (!isLogged) {
      return { password: 'Incorrect password.' };
    }

    await setTimer();

    return navigate(route.accountManagerPage);
  };

  if (loading) {
    return <LoadingOne />;
  }

  return (
    <Layout1 isDashboard={false}>
      <Container>
        <Logo />

        <Form
          onSubmit={(values:FormValues) => onSubmit(values)}
          render={({
            submitError,
            handleSubmit,
            submitting,
            pristine,
          }) => (
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    type="password"
                    placeholder="Password"
                    size="large"
                    variant="password"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                )}
              </Field>

              {submitError && <div className="error">{submitError}</div>}

              <Button
                type="submit"
                variant="primary"
                size="large"
                content="Unlock"
                style={{ marginTop: '32px' }}
                disabled={pristine || submitting}
              />
            </form>
          )}
        />
      </Container>
    </Layout1>
  );
};

export default Login;

const Container = styled.div`
  .form {
    margin-top: 78px;
  }
`;
