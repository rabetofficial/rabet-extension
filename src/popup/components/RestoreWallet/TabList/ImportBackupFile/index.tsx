import { useDropzone } from 'react-dropzone';
import { Form, Field } from 'react-final-form';
import React, { useState, useCallback } from 'react';

import { Usage } from 'popup/models';
import { decrypt } from 'helpers/crypto';
import Download from 'popup/svgs/Download';
import ArrowBack from 'popup/svgs/ArrowBack';
import Error from 'popup/components/common/Error';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import ButtonContainer from 'popup/components/common/ButtonContainer';
import addBackupAccountsAction from 'popup/actions/accounts/addBackup';

import * as S from './styles';

type FormValues = {
  key: string;
};

type ImportBackupFileType = {
  isModal?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  usage: Usage;
};

const ImportBackupFile = ({
  isModal,
  onCancel,
  onSubmit,
  usage,
}: ImportBackupFileType) => {
  const [fileContent, setFileContent] = useState('');

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();

    reader.onabort = () => {};
    reader.onerror = () => {};
    reader.onload = () => {
      const binaryStr = reader.result;
      const enc = new TextDecoder('utf-8');
      const text = enc.decode(binaryStr);

      setFileContent(text);
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'text/plain',
    maxFiles: 1,
  });

  const handleCancel = (form: any) => {
    form.reset();

    onCancel();
  };

  const handleSubmitFunc = async (values: FormValues) => {
    if (!fileContent) {
      return {
        key: 'Uploaded file has no content',
      };
    }

    let data;

    try {
      data = JSON.parse(decrypt(values.key, fileContent));
    } catch (e) {
      return {
        key: 'Could not decrypt the specified file.',
      };
    }

    await addBackupAccountsAction(data);

    onSubmit();

    return {};
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.key) {
      errors.key = '';
    } else if (values.key.length < 10) {
      errors.key = 'Invalid key';
    }

    return errors;
  };

  const isUploaded = acceptedFiles && acceptedFiles.length;

  return (
    <div>
      <S.MediaBtn {...getRootProps()}>
        <input {...getInputProps()} />
        <Button
          type="file"
          variant="outlined"
          size="medium"
          content={
            isUploaded ? acceptedFiles[0].name : 'Select backup file'
          }
          startIcon={isUploaded ? '' : <Download />}
          style={{
            borderRadius: '4px',
            marginTop: '5px',
          }}
        />
      </S.MediaBtn>

      {isUploaded ? (
        <Form
          onSubmit={handleSubmitFunc}
          validate={validateForm}
          render={({ submitError, handleSubmit, form, pristine }) => (
            <form
              className="form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <Field name="key">
                {({ input, meta }) => (
                  <S.InputContainer>
                    <label className="label-primary">Key</label>
                    <Input
                      type="text"
                      size="medium"
                      placeholder="Enter your key"
                      input={input}
                      meta={meta}
                      autoFocus
                    />
                  </S.InputContainer>
                )}
              </Field>
              {submitError && <Error>{submitError}</Error>}
              {isModal || usage === 'extension' ? (
                <ButtonContainer
                  btnSize={100}
                  justify="end"
                  mt={usage === 'extension' ? 170 : 60}
                  gap={7}
                >
                  <Button
                    variant="default"
                    size="medium"
                    content="Cancel"
                    onClick={() => {
                      handleCancel(form);
                    }}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    content="Import"
                    disabled={pristine}
                  />
                </ButtonContainer>
              ) : (
                <S.ButtonContainer>
                  <Button
                    type="submit"
                    variant="primary"
                    size="medium"
                    content="Import"
                    disabled={pristine}
                  />
                  <S.SecondButton>
                    <Button
                      variant="default"
                      size="medium"
                      content="Back"
                      onClick={() => {
                        handleCancel(form);
                      }}
                      startIcon={<ArrowBack />}
                    />
                  </S.SecondButton>
                </S.ButtonContainer>
              )}
            </form>
          )}
        />
      ) : (
        ''
      )}
    </div>
  );
};

ImportBackupFile.defaultProps = {
  isModal: false,
};
export default ImportBackupFile;
