import React, { useState } from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import RouteName from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';
import Plus from 'popup/svgs/Plus';
import File from 'popup/svgs/File';
import Setting from 'popup/svgs/Setting';
import Lock from 'popup/svgs/Lock';
import ModalDialog from 'popup/components/common/ModalDialog';
import CreateWallet from 'popup/pageComponents/CreateWallet';
import RestoreWallet from 'popup/pageComponents/RestoreWallet';

import * as S from './styles';

const Menus = () => {
  const navigate = useNavigate();

  const [modal1, setModal1] = useState(false);
  const onOpenModal1 = () => setModal1(true);
  const onCloseModal1 = () => setModal1(false);
  const [modal2, setModal2] = useState(false);
  const onOpenModal2 = () => setModal2(true);
  const onCloseModal2 = () => setModal2(false);

  const handleLock = () => {
    lockAction(navigate);
  };

  const buttons = [
    {
      link: '#',
      icon: <Plus />,
      label: 'Create Wallet',
      onClick: onOpenModal1,
    },
    {
      link: '#',
      icon: <File />,
      label: 'Import Wallet',
      onClick: onOpenModal2,
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
    <>
      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={onCloseModal1}
        isOpen={modal1}
      >
        <CreateWallet
          onSubmit={() => console.log('deal with this')}
          onCancel={() => console.log('deal with this')}
        />
      </ModalDialog>
      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={onCloseModal2}
        isOpen={modal2}
      >
        <RestoreWallet />
      </ModalDialog>
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
    </>
  );
};

export default Menus;
