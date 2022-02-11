import React from 'react';
import { Form } from 'react-final-form';

import Input from 'popup/components/common/Input';
import currentActiveAccount from 'popup/utils/activeAccount';
import changeNameAction from 'popup/actions/accounts/changeName';
import PenEdit from 'popup/svgs/PenEdit';
import CheckMark from 'popup/svgs/CheckMark';

import * as S from './styles';

type AppProps = {
  isEditable: boolean;
  setEditable: (value: boolean) => void;
};

type FormValues = {
  name: string;
};

const EditWalletName = ({ isEditable, setEditable }: AppProps) => {
  const onSubmit = (values: FormValues) => {
    changeNameAction(values.name);

    setEditable(!isEditable);
  };

  const validateForm = (values: FormValues) => {
    const errors = {} as FormValues;

    if (!values.name) {
      errors.name = '';
    }

    return errors;
  };

  const { activeAccount, activeAccountIndex } =
    currentActiveAccount();

  return (
    <>
      {isEditable ? (
        <Form
          onSubmit={(values: FormValues) => onSubmit(values)}
          validate={(values: FormValues) => validateForm(values)}
          render={({ submitError, handleSubmit }) => (
            <form
              className="flex"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <S.InputField
                name="name"
                initialValue={
                  activeAccount.name ||
                  `Account ${activeAccountIndex + 1}`
                }
              >
                {({ input, meta }: any) => (
                  <Input
                    type="text"
                    size="small"
                    className="w-full !m-0"
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                )}
              </S.InputField>
              {submitError && (
                <div className="error">{submitError}</div>
              )}

              <div>
                <S.SubmitButton
                  type="submit"
                  variant="primary"
                  content={<CheckMark />}
                />
              </div>
            </form>
          )}
        />
      ) : (
        <S.Info>
          <div>
            {(activeAccount.name &&
              (activeAccount.name.length < 13
                ? activeAccount.name
                : activeAccount.name.substr(0, 13).concat('...'))) ||
              `Account ${activeAccountIndex + 1}`}
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
