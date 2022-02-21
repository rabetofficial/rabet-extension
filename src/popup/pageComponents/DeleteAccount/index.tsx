import React from 'react';

import Note from 'popup/components/Note';
import Button from 'popup/components/common/Button';
import Trash from 'popup/svgs/Trash';

import * as S from './styles';

const message =
  'Please note that by clicking on the Delete button all the information for this account will be deleted from the extension. So please make sure you have a backup of the private key for this account.';

type DeleteAccountTypes = {
  children?: React.ReactNode;
  onCancel: () => void;
  onClick: () => void;
};
const DeleteAccount = (props: DeleteAccountTypes) => {
  const { children, onClick, onCancel } = props;

  return (
    <>
      {children}
      <S.Container>
        <Note text={message} />

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
            content="Delete"
            startIcon={<Trash />}
            onClick={onClick}
          />
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

DeleteAccount.defaultProps = {
  children: '',
};

export default DeleteAccount;
