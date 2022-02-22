import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';

import Download from 'popup/svgs/Download';
import ArrowBack from 'popup/svgs/ArrowBack';
import RouteName from 'popup/staticRes/routes';
import Error from 'popup/components/common/Error';
import Input from 'popup/components/common/Input';
import Button from 'popup/components/common/Button';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

type FormValues = {
  key: string;
};

type ImportBackupFileType = {
  isModal?: boolean;
};

const ImportBackupFile = ({ isModal }: ImportBackupFileType) => {
  const navigate = useNavigate();
  const [showRest, setShowRest] = useState(false);
  const accounts = useTypedSelector((store) => store.accounts);

  const handleClick = () => {
    setShowRest(!showRest);
  };

  const handleCancel = (form: any) => {
    form.reset();

    if (accounts.length) {
      return navigate(RouteName.Home, {
        state: {
          alreadyLoaded: true,
        },
      });
    }

    return navigate(RouteName.First);
  };

  const onSubmit = async (values: FormValues) => {
    console.log('i will deal with this later');
    console.log(values);
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.key) {
      errors.key = '';
    } else if (values.key.length < 30) {
      errors.key = 'Invalid key';
    }

    return errors;
  };

  return (
    <div>
      <Button
        type="file"
        variant="outlined"
        size="medium"
        content="Select backup file"
        startIcon={<Download />}
        onClick={handleClick}
        style={{
          borderRadius: '4px',
          marginTop: '5px',
        }}
      />

      {showRest && (
        <Form
          onSubmit={onSubmit}
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
              {isModal ? (
                <ButtonContainer btnSize={100} justify="end" mt={60}>
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
                  <Button
                    style={{ marginTop: '12px' }}
                    variant="default"
                    size="medium"
                    content="Back"
                    onClick={() => {
                      handleCancel(form);
                    }}
                    startIcon={<ArrowBack />}
                  />
                </S.ButtonContainer>
              )}
            </form>
          )}
        />
      )}
    </div>
  );
};

ImportBackupFile.defaultProps = {
  isModal: false,
};
export default ImportBackupFile;
