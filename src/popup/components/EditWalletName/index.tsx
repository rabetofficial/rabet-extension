import React from 'react';
import { Form } from 'react-final-form';

import Input from 'popup/components/common/Input';
import currentActiveAccount from 'popup/utils/activeAccount';
import changeNameAction from 'popup/actions/accounts/changeName';
import PenEdit from 'popup/svgs/PenEdit';

import * as S from './styles';

const EditWalletName = ({ editName, setEditName }) => {
  const onSubmit = (values) => {
    changeNameAction(values.name);

    setEditName(!editName);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = null;
    }

    return errors;
  };

  const { activeAccount, activeAccountIndex } =
    currentActiveAccount();

  return (
    <>
      {editName ? (
        <Form
          onSubmit={(values) => onSubmit(values)}
          validate={(values) => validateForm(values)}
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
                {({ input, meta }) => (
                  <Input
                    type="text"
                    size="small"
                    style={{ width: '137px', marginTop: '0' }}
                    input={input}
                    meta={meta}
                    autoFocus
                  />
                )}
              </S.InputField>
              {submitError && (
                <div className="error">{submitError}</div>
              )}

              <S.SubmitButton
                type="submit"
                variant="primary"
                content={<span className="icon-checkmark" />}
              />
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
              setEditName(!editName);
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
