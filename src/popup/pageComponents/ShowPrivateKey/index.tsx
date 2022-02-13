import React from 'react';
import { Form, Field } from 'react-final-form';

import Header from 'popup/components/common/Header';
import PageTitle from 'popup/components/PageTitle';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import Error from 'popup/components/common/Error';

import * as S from './styles';

export type FormValues = {
  key: string;
};

type ShowPrivateKeyTypes = {
  onSubmit: (values: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
};
const ShowPrivateKeyComponent = (props: ShowPrivateKeyTypes) => {
  const { onSubmit, onCancel } = props;

  return (
    <>
      <Header />
      <PageTitle title="Show private key" />
      <S.Container>
        <Form
          onSubmit={onSubmit}
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

              <S.ButtonContainer>
                <Button
                  variant="default"
                  size="medium"
                  content="Cancel"
                  onClick={onCancel}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="medium"
                  content="Show"
                  disabled={pristine || submitting}
                />
              </S.ButtonContainer>
            </form>
          )}
        />
      </S.Container>
    </>
  );
};

export default ShowPrivateKeyComponent;
