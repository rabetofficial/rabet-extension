import React from 'react';
import { Form, Field } from 'react-final-form';

import PenEdit from 'popup/svgs/PenEdit';
import CheckMark from 'popup/svgs/CheckMark';
import Input from 'popup/components/common/Input';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import changeNameAction from 'popup/actions/accounts/changeName';

import * as S from './styles';

type AppProps = {
  isEditable: boolean;
  setEditable: (value: boolean) => void;
  height: number;
  fontSize: number;
};

type FormValues = {
  name: string;
};

const EditWalletName = ({
  isEditable,
  setEditable,
  height,
  fontSize,
}: AppProps) => {
  const { name, publicKey } = useActiveAccount();

  const onSubmit = (values: FormValues) => {
    changeNameAction(values.name, publicKey);

    setEditable(!isEditable);
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.name) {
      errors.name = '';
    }

    return errors;
  };

  return (
    <>
      {isEditable ? (
        <Form
          onSubmit={(values: FormValues) => onSubmit(values)}
          validate={(values: FormValues) => validateForm(values)}
          render={({ submitError, handleSubmit }) => (
            <S.Form
              onSubmit={handleSubmit}
              autoComplete="off"
              fontSize={fontSize}
            >
              <Field name="name" initialValue={name}>
                {({ input, meta }: any) => (
                  <Input
                    type="text"
                    size="small"
                    className="w-full !m-0"
                    input={input}
                    meta={meta}
                    autoFocus
                    style={{ height: `${height}px` }}
                  />
                )}
              </Field>
              {submitError && (
                <div className="error">{submitError}</div>
              )}

              <div>
                <S.SubmitButton
                  type="submit"
                  variant="primary"
                  content={<CheckMark />}
                  size={height}
                />
              </div>
            </S.Form>
          )}
        />
      ) : (
        <S.Info fontSize={fontSize}>
          <div>
            {name &&
              (name.length < 13
                ? name
                : name.substr(0, 13).concat('...'))}
          </div>
          <S.EditIcon
            onClick={() => {
              setEditable(!isEditable);
            }}
          >
            <PenEdit />
          </S.EditIcon>
        </S.Info>
      )}
    </>
  );
};

export default EditWalletName;
