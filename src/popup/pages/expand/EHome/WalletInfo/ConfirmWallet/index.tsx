import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import WalletInfo from '../index';

const ConfirmWallet = () => {
  const changeContent = (element: JSX.Element) => {
    setCurrentElement(element);
  };
  const onSubmit = () => {
    changeContent(<WalletInfo />);
  };
  const validateForm = () => {};

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
        render={({ submitError, handleSubmit, invalid }) => (
          <form onSubmit={handleSubmit} autoComplete="off">
            <Field name="password">
              {({ input, meta }) => (
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
              )}
            </Field>

            {submitError && <Error>{submitError}</Error>}

            <ButtonContainer btnSize={86} mt={32} justify="end">
              <Button
                type="submit"
                variant="primary"
                size="medium"
                content="Show"
                disabled={invalid}
              />
            </ButtonContainer>
          </form>
        )}
      />
    </div>
  );
};

export default ConfirmWallet;
