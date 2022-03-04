import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import WalletInfo from '../index';

type FormValues = {
  password: string;
};
const ConfirmWallet = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const user = useTypedSelector((store) => store.user);

  const onSubmit = (values: FormValues) => {
    if (user.password !== values.password) {
      return {
        password: 'Password is incorrect.',
      };
    }

    setIsSubmitted(true);

    return {};
  };

  const validateForm = (values: FormValues) => {
    if (!values.password) {
      return {
        password: '',
      };
    }

    return {};
  };

  if (isSubmitted) {
    return <WalletInfo />;
  }

  return (
    <div className="max-w-[460px]">
      <div className="mt-1 mb-[52px]">
        <p className="text-base">
          For security concerns, you need to enter your password to
          see the wallet info
        </p>
      </div>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
        render={({
          pristine,
          submitting,
          submitError,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="password">
              {({ input, meta }) => (
                <>
                  <div>
                    <label className="mb-[6px] text-base font-medium">
                      Password
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      size="medium"
                      variant="password"
                      input={input}
                      meta={meta}
                    />
                  </div>

                  {submitError && !meta.modifiedSinceLastSubmit ? (
                    <Error>{submitError}</Error>
                  ) : (
                    ''
                  )}
                  {console.log(
                    submitError && !meta.modifiedSinceLastSubmit,
                  )}
                </>
              )}
            </Field>

            <ButtonContainer btnSize={86} mt={32} justify="end">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Show"
                disabled={submitting || pristine}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </div>
  );
};

export default ConfirmWallet;
