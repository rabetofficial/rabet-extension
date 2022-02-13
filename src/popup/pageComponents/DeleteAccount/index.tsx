import React from 'react';

import Note from 'popup/components/Note';
import Button from 'popup/components/common/Button';

import * as S from './styles';

const message =
  'Please note that by clicking on the Delete button all the information for this account will be deleted from the extension. So please make sure you have a backup of the private key for this account.';

const deleteBtn = (
  <>
    <span className="icon-trash" />
    Delete
  </>
);
type DeleteAccountTypes = {
  children: React.ReactNode;
  onCancel: () => void;
  onClick: () => void;
};
const DeleteAccount = (props: DeleteAccountTypes) => {
  const { children, onClick, onCancel } = props;

  return (
    <>
      {children}
      <S.Container>
        <Note text={message} variant="warn" />

        <S.ButtonContainer>
          <Button
            variant="default"
            size="medium"
            content="Cancel"
            onClick={onCancel}
          />

          <Button
            type="button"
            variant="danger"
            size="medium"
            content={deleteBtn}
            onClick={onClick}
          />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

export default DeleteAccount;
