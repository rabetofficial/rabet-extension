import React from 'react';
import { StrKey } from 'stellar-sdk';
import { Form, Field } from 'react-final-form';

import assetExists from 'popup/api/assetExists';
import Input from 'popup/components/common/Input';
import Error from 'popup/components/common/Error';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import * as S from './styles';

export type FormValues = {
  code: string;
  issuer: string;
  limit?: string;
};

type CustomAssetTypes = {
  onSubmit: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancel: () => void;
};

const CustomAsset = ({ onSubmit, onCancel }: CustomAssetTypes) => {
  const account = useActiveAccount();
  const assets = account.assets || [];

  const validateForm = async (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    let hasError = false;

    if (!values.code) {
      errors.code = '';
      hasError = true;
    }

    if (!values.issuer) {
      errors.issuer = '';
      hasError = true;
    } else if (!StrKey.isValidEd25519PublicKey(values.issuer)) {
      errors.issuer = 'Invalid issuer.';
      hasError = true;
    }

    if (!hasError) {
      const foundAsset = assets?.find(
        (x) =>
          (x.asset_type === 'credit_alphanum12' ||
            x.asset_type === 'credit_alphanum4') &&
          x.asset_code === values.code &&
          x.asset_issuer === values.issuer,
      );

      if (foundAsset) {
        errors.code = 'Asset is already added.';
      }

      const assetExistsResult = await assetExists(
        values.code,
        values.issuer,
      );

      if (!assetExistsResult) {
        errors.code = 'Asset not found.';
      }
    }

    return errors;
  };

  return (
    <S.Container>
      <Form
        onSubmit={onSubmit}
        validate={validateForm}
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
