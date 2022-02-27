import React from 'react';

import Button from 'popup/components/common/Button';
import Input from 'popup/components/common/Input';
import CopyText from 'popup/components/CopyText';
import { Form, Field } from 'react-final-form';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import PageTitle from 'popup/components/PageTitle';

import * as S from './styles';

type BackupType = { onSubmit: () => void };

const Backup = ({ onSubmit }: BackupType) => (
  <div style={{ width: '80%' }}>
    <PageTitle isSetting title="Backup" padding="0" />

    <S.info>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor
    </S.info>
    <div style={{ marginTop: '24px' }}>
      <S.Label>Key</S.Label>
      <S.Box>
        w5qSjNMeT33XpAfHeuKJ
        <S.Copy>
          <CopyText copyButton text="w5qSjNMeT33XpAfHeuKJ" />
        </S.Copy>
      </S.Box>
    </div>
    <Form
      onSubmit={onSubmit}
      render={({
        submitError,
        handleSubmit,
        submitting,
        pristine,
      }) => (
        <form
          className="form"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <S.Label>Password</S.Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  size="medium"
                  variant="password"
                  input={input}
                  meta={meta}
                  autoFocus
                />
              </div>
            )}
          </Field>

          {submitError && <div className="error">{submitError}</div>}

          <ButtonContainer btnSize={120} mt={32} justify="end">
            <Button
              type="submit"
              variant="primary"
              size="medium"
              content="Download"
              disabled={pristine || submitting}
            />
          </ButtonContainer>
        </form>
      )}
    />
  </div>
);

export default Backup;
