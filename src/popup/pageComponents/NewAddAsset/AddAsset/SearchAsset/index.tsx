import React from 'react';
import { Field, Form } from 'react-final-form';

import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';

import * as S from './styles';

type SearchAssetTypes = {
  onSubmit: () => void;
  onCancel: () => void;
};
const SearchAsset = (props: SearchAssetTypes) => {
  const { onSubmit, onCancel } = props;

  return (
    <S.Container>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <Field name="token">
              {({ input, meta }) => (
                <Input
                  type="text"
                  placeholder="&#xe915;&nbsp;&nbsp;Search assets"
                  size="medium"
                  input={input}
                  meta={meta}
                  style={{ fontFamily: "Roboto, 'icomoon'" }}
                  autoFocus
                />
              )}
            </Field>
            <h6>Search result</h6>
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
              />
            </S.ButtonContainer>
          </form>
        )}
      />
    </S.Container>
  );
};

export default SearchAsset;
