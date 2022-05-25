import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate, useLocation } from 'react-router-dom';

import Logo from 'popup/components/Logo';
import Layout from 'popup/components/common/Layouts/BaseLayout';
import RouteName from 'popup/staticRes/routes';
import LoadingOne from 'popup/pages/LoadingOne';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import setTimer from 'popup/actions/options/setTimer';
import loginUserAction from 'popup/actions/user/login';
import hadLoggedBeforeAction from 'popup/actions/user/hadLoggedBeforeAction';

type FormValues = {
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state) {
      hadLoggedBeforeAction().then((hasLogged) => {
        if (hasLogged) {
          loginUserAction(hasLogged).then((isLogged) => {
            if (isLogged) {
              navigate(RouteName.AccountManager);
            } else {
              navigate(RouteName.Login);
            }

            setLoading(false);
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
      <Logo />

      <h1 className="text-2xl text-center mt-4 font-bold">
        Welcome back!
      </h1>
      <p className="text-sm text-primary-dark text-center mt-[6px]">
        Log back into your future in finance
      </p>

      <Form
        onSubmit={onSubmit}
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
        }) => (
          <form
            className="mt-[40px]"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="password">
              {({ input, meta }) => (
                <Input
                  type="password"
                  placeholder="Password"
                  size="medium"
                  variant="password"
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
    </Layout>
  );
};

export default Login;
