import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Header from 'popup/components/Header';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import createAccountAction from 'popup/actions/accounts/create';
import ButtonContainer from 'popup/components/common/ButtonContainer';

type FormValues = {
  name: string | null;
};

const CreateWallet = ({ accounts }) => {
  const navigate = useNavigate();

  const handleCancel = (form: any) => {
    form.reset();

    if (accounts.length) {
      return navigate(route.homePage, {
        state: {
          alreadyLoaded: true,
        },
      });
    }

    return navigate(route.firstPage);
  };

  const onSubmit = async (values: FormValues) => {
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    return navigate(route.backupFile);
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

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
          onSubmit={(values: FormValues) => onSubmit(values)}
          validate={(values: FormValues) => validateForm(values)}
          render={({ submitError, handleSubmit, form, pristine }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="name">
                {({ input, meta }) => (
                  <div>
                    <label className="label-primary">
                      Wallet name
                    </label>
                    <Input
                      type="text"
                      size="medium"
                      placeholder="John"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </div>
                )}
              </Field>
              {submitError && (
                <div className="error">{submitError}</div>
              )}
              <ButtonContainer
                btnSize={100}
                gap={12}
                mt={28}
                justify="end"
              >
                <Button
                  variant="default"
                  size="small"
                  content="Cancel"
                  onClick={() => {
                    handleCancel(form);
                  }}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="small"
                  content="Create"
                  disabled={pristine}
                />
              </ButtonContainer>
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
