import { connect } from 'react-redux';
import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from '../../components/Input';
import Header from '../../components/Header';
import Button from '../../components/Button';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import createAccountAction from '../../actions/accounts/create';

const CreateWallet = ({ accounts, history }) => {
  const handleCancel = (form) => {
    form.reset();

    if (accounts.length) {
      return history.push({
        pathname: route.homePage,
        state: {
          alreadyLoaded: true,
        },
      });
    }

    return history.push({
      pathname: route.firstPage,
    });
  };

  const onSubmit = async (values) => {
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    return history.push(route.homePage);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  };

  return (
    <>
      <Header />
      <PageTitle title="Create New Wallet" />
      <div className="content" style={{ marginTop: '28px' }}>
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
          render={({
            submitError,
            handleSubmit,
            form,
            pristine,
          }) => (
            <form className="form" onSubmit={handleSubmit} autoComplete="off">
              <Field name="name">
                {({ input, meta }) => (
                  <div>
                    <label className="label-primary">Wallet name</label>
                    <Input
                      type="text"
                      size="input-medium"
                      placeholder="John"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </div>
                )}
              </Field>
              {submitError && <div className="error">{submitError}</div>}
              <div className="pure-g justify-end" style={{ marginTop: '28px' }}>
                <Button
                  variant="btn-default"
                  size="btn-small"
                  content="Cancel"
                  style={{ marginRight: '12px' }}
                  onClick={() => {
                    handleCancel(form);
                  }}
                />

                <Button
                  type="submit"
                  variant="btn-primary"
                  size="btn-small"
                  content="Create"
                  disabled={pristine}
                />
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default connect((state) => ({
  accounts: state.accounts,
}))(CreateWallet);
