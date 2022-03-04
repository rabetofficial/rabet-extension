import React from 'react';
import { Form, Field } from 'react-final-form';
import { customAlphabet, urlAlphabet } from 'nanoid';

import CopyText from 'popup/components/CopyText';
import Input from 'popup/components/common/Input';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import TooltipLabel from 'popup/components/common/TooltipLabel';

import * as S from './styles';

type BackupProps = {
  onClose: () => void;
};

type FormValues = {
  password: string;
};

const Backup = ({ onClose }: BackupProps) => {
  const user = useTypedSelector((store) => store.user);

  const nanoid = customAlphabet(urlAlphabet, 10);
  const id = nanoid(20);

  const onSubmit = (values: FormValues) => {
    if (user.password !== values.password) {
      return {
        password: 'Password is incorrect',
      };
    }

    console.log('NOW GIMME THE BACKUP');
  };

  return (
    <div style={{ width: '80%' }}>
      <PageTitle
        isSetting
        padding="0"
        title="Backup"
        onClose={onClose}
      />

      <S.info>
        Save the key and download the backup file. With this file and
        key, you will import all wallets when you want.
      </S.info>
      <div style={{ marginTop: '24px' }}>
        <TooltipLabel
          text="Key"
          tooltipText="Rabet will lock automatically after a set amount of time."
        />
        <S.Box>
          {id}
          <S.Copy>
            <CopyText copyButton text={id} />
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

            {submitError && (
              <div className="error">{submitError}</div>
            )}

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
};

export default Backup;
