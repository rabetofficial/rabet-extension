import { Form, Field } from 'react-final-form';
import { customAlphabet, urlAlphabet } from 'nanoid';
import React, { useEffect, useRef, useState } from 'react';

import { encrypt } from 'helpers/crypto';
import Input from 'popup/components/common/Input';
import PageTitle from 'popup/components/PageTitle';
import Button from 'popup/components/common/Button';
import CopyText from 'popup/components/common/CopyText';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import TooltipLabel from 'popup/components/common/TooltipLabel';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type BackupProps = {
  onClose: () => void;
  needTitle?: boolean;
};

type FormValues = {
  password: string;
};

const Backup = ({ onClose, needTitle }: BackupProps) => {
  const dlRef = useRef(null);
  const [user, accounts] = useTypedSelector((store) => [
    store.user,
    store.accounts,
  ]);
  const [fileDownloadUrl, setFileDownloadUrl] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const nanoid = customAlphabet(urlAlphabet, 10);

    setId(nanoid(20));
  }, []);

  const onSubmit = (values: FormValues) => {
    if (user.password !== values.password) {
      return {
        password: 'Password is incorrect',
      };
    }

    const accountsJSON = JSON.stringify(accounts, null, 2);
    const jsonEncrypted = encrypt(id, accountsJSON);
    const blob = new Blob([jsonEncrypted]);
    const fileDlUrl = URL.createObjectURL(blob);

    setFileDownloadUrl(fileDlUrl);

    setTimeout(() => {
      dlRef?.current?.click();

      onClose();
    }, 100);

    return {};
  };

  return (
    <div style={{ maxWidth: '460px' }}>
      {needTitle && (
        <PageTitle
          isSetting
          padding="0"
          title="Backup"
          onClose={onClose}
        />
      )}

      <S.info>
        Save the key and download the backup file. With this file and
        key, you will import all wallets when you want.
      </S.info>
      <div style={{ marginTop: '24px' }}>
        <TooltipLabel
          text="Key"
          tooltipText="Please make sure you save this key because the backup file will be encrypted with it, and if you lose it, you will not be able to import your wallets."
        />
        <S.Box>
          {id}
          <S.Copy>
            <CopyText fullIcon text={id} />
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

            <a
              className="hidden"
              download="backup.txt"
              href={fileDownloadUrl}
              ref={dlRef}
            >
              download it
            </a>
          </form>
        )}
      />
    </div>
  );
};
Backup.defaultProps = { needTitle: true };

export default Backup;
