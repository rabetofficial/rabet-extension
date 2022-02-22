import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import Trash from 'popup/svgs/Trash';
import RouteName from 'popup/staticRes/routes';
import Button from 'popup/components/common/Button';
import CopyKey from 'popup/components/common/CopyKey';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import EditWalletName from 'popup/components/EditWalletName';
import InsideTabLayout from 'popup/components/common/Layouts/InsideTabLayout';
import ModalDialog from 'popup/components/common/ModalDialog';
import DeleteAccount from 'popup/pageComponents/DeleteAccount';
import currentActiveAccount from 'popup/utils/activeAccount';
import removeAccountAction from 'popup/actions/accounts/remove';

const Hr = styled.hr`
  border-top: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  margin: 40px 0;
`;

const WalletInfo = () => {
  const navigate = useNavigate();

  const { publicKey, privateKey } = useActiveAccount();
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);

  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  const handleDelete = () => {
    const { activeAccount } = currentActiveAccount();
    removeAccountAction(activeAccount.publicKey, navigate);
  };

  return (
    <InsideTabLayout>
      <div className="pb-[67px]">
        <div className="label-primary mb-[6px]">Wallet name</div>
        <EditWalletName
          height={48}
          checkIconWidth={22}
          fontSize={16}
        />

        <div className="label-primary mt-6 mb-[6px]">Private Key</div>
        <CopyKey keyValue={privateKey} />

        <div className="label-primary mt-6 mb-[6px]">Address</div>
        <CopyKey keyValue={publicKey} />

        <Hr />

        <Button
          variant="danger"
          content="Delete account"
          size="medium"
          startIcon={<Trash />}
          onClick={onOpenModal}
        />
        <ModalDialog
          title="Delete account"
          size="medium"
          padding="large"
          onClose={onCloseModal}
          isOpen={modal}
        >
          <DeleteAccount
            onClick={handleDelete}
            onCancel={handleCancel}
          />
        </ModalDialog>
      </div>
    </InsideTabLayout>
  );
};

export default WalletInfo;
