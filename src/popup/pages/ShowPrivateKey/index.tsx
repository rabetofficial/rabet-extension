import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Header from 'popup/components/Header';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import Error from 'popup/components/common/Error';
import showPrivateKeyAction from 'popup/actions/accounts/showPrivateKey';

import styles from './styles.less';

type FormValues = {
  key: string;
};

const ShowPrivateKey = () => {
  const navigate = useNavigate();

  const onSubmit = async (values: FormValues) => {
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
          onSubmit={(values: FormValues) => onSubmit(values)}
          validate={() => {}}
          render={({
            pristine,
            submitting,
            submitError,
            handleSubmit,
          }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="key">
                {({ input, meta }) => (
                  <div>
                    <label className="label-primary">Password</label>
                    <Input
                      type="password"
                      size="medium"
                      variant="password"
                      placeholder="Enter your password"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </div>
                )}
              </Field>

              {submitError && <Error>{submitError}</Error>}

              <div
                className={classNames(
                  'pure-g justify-end',
                  styles.buttons,
                )}
              >
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={() => {
                    navigate(route.homePage, {
                      state: {
                        alreadyLoaded: true,
                      },
                    });
                  }}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
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
