import { Form, Field } from 'react-final-form';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import LoadingOne from 'popup/pages/LoadingOne';
import Logo from 'popup/components/Logo';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import RouteName from 'popup/staticRes/routes';
import setTimer from 'popup/actions/options/setTimer';
import loginUserAction from 'popup/actions/user/login';
import hadLoggedBeforeAction from 'popup/actions/user/hadLoggedBeforeAction';
import Layout from 'popup/components/Layout';

type FormValues = {
  password: string;
};

const Container = styled.div`
  .form {
    margin-top: 78px;
  }
`;

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

              navigate(RouteName.AccountManager);
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

    return navigate(RouteName.AccountManager);
  };

  if (loading) {
    return <LoadingOne />;
  }

  return (
    <Layout isDashboard={false}>
      <Container>
        <Logo />

        <Form
          onSubmit={(values: FormValues) => onSubmit(values)}
          render={({
            submitError,
            handleSubmit,
            submitting,
            pristine,
          }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="password">
                {({ input, meta }) => (
                  <Input
                    type="password"
                    placeholder="Password"
                    size="medium"
                    variant="max"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                )}
              </Field>

              {submitError && (
                <div className="error">{submitError}</div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Unlock"
                className="mt-8"
                disabled={pristine || submitting}
              />
            </form>
          )}
        />
      </Container>
    </Layout>
  );
};

export default Login;
