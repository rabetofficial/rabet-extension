import React from 'react';
import { connect } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Input from 'popup/components/common/Input';
import Header from 'popup/components/Header';
import Button from 'popup/components/common/Button';
import * as route from 'popup/staticRes/routes';
import PageTitle from 'popup/components/PageTitle';
import restoreAccountAction from 'popup/actions/accounts/restore';
import validatePrivateKey from 'popup/utils/validate/privateKey';
import ButtonContainer from 'popup/components/common/ButtonContainer';

type FormValues = {
  key: string | null;
};

const RestoreWallet = ({ accounts }) => {
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
    if (!validatePrivateKey(values.key)) {
      return { key: 'Invalid private key.' };
    }

    const isDuplicated = accounts.some(
      (x) => x.privateKey === values.key,
    );

    if (isDuplicated) {
      return { key: 'Account is duplicated.' };
    }

    const account = await restoreAccountAction(values.key);

    if (account === 'duplicate') {
      return {
        key: "The account you're trying to import is a duplicate.",
      };
    }

    if (!account) {
      return { key: 'Invalid seed.' };
    }

    return navigate(route.homePage);
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.key) {
      errors.key = null;
    }

    return errors;
  };

  return (
    <>
      <Header />
      <PageTitle title="Import Wallet" />
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
              <Field name="key">
                {({ input, meta }) => (
                  <>
                    <label className="label-primary">
                      Private key
                    </label>
                    <Input
                      type="text"
                      size="medium"
                      placeholder="S..."
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </>
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
                  content="Import"
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
}))(RestoreWallet);
