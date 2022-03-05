import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import Header from 'popup/components/common/Header';

import * as S from './styles';

export type FormValues = {
  key: string;
};

type ShowPrivateKeyTypes = {
  onSubmit: (values: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
  children?: React.ReactNode;
};
const ShowPrivateKeyComponent = ({
  onSubmit,
  onCancel,
  children,
}: ShowPrivateKeyTypes) => (
  <>
    <Header />
    <div className="px-4 pt-4">{children}</div>
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

ShowPrivateKeyComponent.defaultProps = {
  children: '',
};
export default ShowPrivateKeyComponent;
