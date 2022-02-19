import React, { useState } from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import RouteName, { restoreWalletPage } from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';
import Plus from 'popup/svgs/Plus';
import File from 'popup/svgs/File';
import Setting from 'popup/svgs/Setting';
import Lock from 'popup/svgs/Lock';
import ModalDialog from 'popup/components/common/ModalDialog';
import CreateWallet from 'popup/pageComponents/CreateWallet';

import * as S from './styles';

const Menus = () => {
  const navigate = useNavigate();

  const handleLock = () => {
    lockAction(navigate);
  };
  const handleCreateModal = () => {
    const [modal, setModal] = useState(false);
    const onOpenModal = () => setModal(true);
    const onCloseModal = () => setModal(false);
    return (
      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={onCloseModal}
        isOpen={modal}
      >
        <CreateWallet
          onSubmit={() => console.log('deal with this')}
          onCancel={() => console.log('deal with this')}
        />
      </ModalDialog>
    );
  };
  const handleImportModal = () => {
    const [modal, setModal] = useState(false);
    const onOpenModal = () => setModal(true);
    const onCloseModal = () => setModal(false);
    return (
      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={onCloseModal}
        isOpen={modal}
      >
        <CreateWallet
          onSubmit={() => console.log('deal with this')}
          onCancel={() => console.log('deal with this')}
        />
      </ModalDialog>
    );
  };

  const buttons = [
    {
      link: '#',
      icon: <Plus />,
      label: 'Create Wallet',
      onClick: handleCreateModal,
    },
    {
      link: '#',
      icon: <File />,
      label: 'Import Wallet',
      onClick: handleImportModal,
    },
    {
      link: RouteName.Setting,
      icon: <Setting />,
      label: 'Setting',
    },
    {
      link: '#',
      icon: <Lock />,
      label: 'Lock',
      onClick: handleLock,
    },
  ];

  return (
    <div>
      <S.Group>
        {buttons.map((item) => (
          <S.GroupLink
            key={shortid.generate()}
            to={item.link}
            onClick={item.onClick}
          >
            {item.icon}
            {item.label}
          </S.GroupLink>
        ))}
      </S.Group>
    </div>
  );
};

export default Menus;
