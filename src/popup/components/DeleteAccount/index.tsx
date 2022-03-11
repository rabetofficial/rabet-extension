import React from 'react';
import { useNavigate } from 'react-router-dom';

import Trash from 'popup/svgs/Trash';
import Alert from 'popup/components/common/Alert';
import Button from 'popup/components/common/Button';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import removeAccountAction from 'popup/actions/accounts/remove';
import ButtonContainer from 'popup/components/common/ButtonContainer';

import * as S from './styles';

const message =
  'Please note that by clicking on the Delete button all the information for this account will be deleted from the extension. So please make sure you have a backup of the private key for this account.';

type DeleteAccountTypes = {
  children?: React.ReactNode;
  onCancel: () => void;
  onDelete: () => void;
};
const DeleteAccount = ({
  children,
  onDelete,
  onCancel,
}: DeleteAccountTypes) => {
  const navigate = useNavigate();
  const { publicKey } = useActiveAccount();

  const handleDelete = () => {
    removeAccountAction(publicKey, navigate).then(() => {
      onDelete();
    });
  };

  return (
    <>
      {children}
      <S.Container>
        <Alert text={message} type="alert-warning" />
        <S.ButtonContainer>
          <ButtonContainer btnSize={102} justify="end" mt={36}>
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
              onClick={handleDelete}
            />
          </ButtonContainer>
        </S.ButtonContainer>
      </S.Container>
    </>
  );
};

DeleteAccount.defaultProps = {
  children: '',
};

export default DeleteAccount;
