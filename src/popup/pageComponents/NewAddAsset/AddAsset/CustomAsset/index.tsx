import React from 'react';
import { Form, Field } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import Error from 'popup/components/common/Error';

import * as S from './styles';

type CustomAssetTypes = {
  onSubmit: () => void;
  onCancel: () => void;
};
const CustomAsset = (props: CustomAssetTypes) => {
  const { onSubmit, onCancel } = props;

  return (
    <S.Container>
      <Form
        onSubmit={onSubmit}
        render={({
          submitError,
          handleSubmit,
          submitting,
          pristine,
          invalid,
        }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="code">
              {({ input, meta }) => (
                <S.FieldContainer>
                  <label className="label-primary">Assets code</label>
                  <Input
                    type="text"
                    placeholder="USD"
                    size="medium"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                </S.FieldContainer>
              )}
            </Field>

            <Field name="issuer">
              {({ input, meta }) => (
                <S.FieldContainer>
                  <label className="label-primary">Issuer</label>
                  <Input
                    type="text"
                    placeholder="G..."
                    size="medium"
                    input={input}
                    meta={meta}
                  />
                </S.FieldContainer>
              )}
            </Field>

            <Field name="limit">
              {({ input, meta }) => (
                <S.FieldContainer>
                  <label className="label-primary">
                    Limit
                    <span className="text-sm text-primary-dark ml-2">
                      (optional)
                    </span>
                  </label>
                  <Input
                    type="number"
                    placeholder="10000"
                    size="medium"
                    input={input}
                    meta={meta}
                  />
                </S.FieldContainer>
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
                content="Add"
                disabled={invalid || pristine || submitting}
              />
            </S.ButtonContainer>
          </form>
        )}
      />
    </S.Container>
  );
};

export default CustomAsset;
