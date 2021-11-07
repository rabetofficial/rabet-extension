import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import showPrivateKeyAction from '../../actions/accounts/showPrivateKey';

import styles from './styles.less';

const ShowPrivateKey = () => {
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const isLogged = await showPrivateKeyAction(values.key);

    if (!isLogged) {
      return { key: 'Incorrect password.' };
    }

    return navigate(route.privateKeyPage);
  };

  return (
    <div className={styles.div}>
      <Header />
      <PageTitle title="Show private key" />
      <div className="content" style={{ marginTop: '28px' }}>
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={() => {}}
          render={({
            pristine,
            submitting,
            submitError,
            handleSubmit,
          }) => (
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
              <Field name="key">
                {({ input, meta }) => (
                  <div>
                    <label className="label-primary">Password</label>
                    <Input
                      type="password"
                      size="input-medium"
                      variant="pass-visible"
                      placeholder="Enter your password"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </div>
                )}
              </Field>

              {submitError && <div className="error">{submitError}</div>}

              <div className={classNames('pure-g justify-end', styles.buttons)}>
                <Button
                  variant="btn-default"
                  size="btn-medium"
                  content="Cancel"
                  onClick={() => {
                    navigate({
                      pathname: route.homePage,
                      state: {
                        alreadyLoaded: true,
                      },
                    });
                  }}
                />
                <Button
                  type="submit"
                  variant="btn-primary"
                  size="btn-medium"
                  content="Show"
                  disabled={pristine || submitting}
                />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
};

export default ShowPrivateKey;
