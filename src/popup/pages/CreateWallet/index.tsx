import React from 'react';
import { useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import createAccountAction from 'popup/actions/accounts/create';
import Logo from 'popup/components/Logo';
import Layout from 'popup/components/Layout';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import ArrowBack from 'popup/svgs/ArrowBack';
import Error from 'popup/components/common/Error';

import * as S from './styles';

type FormValues = {
  name: string;
};

const CreateWallet = () => {
  const accounts = useSelector((store) => store.accounts);

  const navigate = useNavigate();

  const handleCancel = (form: any) => {
    form.reset();

    if (accounts.length) {
      return navigate(RouteName.Home, {
        state: {
          alreadyLoaded: true,
        },
      });
    }

    return navigate(RouteName.First);
  };

  const onSubmit = async (values: FormValues) => {
    const isDone = await createAccountAction(values.name);

    if (!isDone) {
      return {
        name: 'Error.',
      };
    }

    return navigate(RouteName.BackupFile);
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};

    if (!values.name) {
      errors.name = '';
    }

    return errors;
  };

  return (
    <Layout isDashboard={false}>
      <div>
        <Logo />
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
                  <S.InputContainer>
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
                  </S.InputContainer>
                )}
              </Field>
              {submitError && <Error>{submitError}</Error>}
              <S.ButtonContainer>
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Create"
                  disabled={pristine}
                />

                <Button
                  style={{ marginTop: '12px' }}
                  variant="default"
                  size="medium"
                  content="Back"
                  onClick={() => {
                    handleCancel(form);
                  }}
                  startIcon={<ArrowBack />}
                />
              </S.ButtonContainer>
            </form>
          )}
        />
      </div>
    </Layout>
  );
};

export default CreateWallet;
