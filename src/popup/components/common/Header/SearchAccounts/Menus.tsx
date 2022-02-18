import React from 'react';
import shortid from 'shortid';
import { useNavigate } from 'react-router-dom';
import RouteName from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';
import Plus from 'popup/svgs/Plus';
import File from 'popup/svgs/File';
import Setting from 'popup/svgs/Setting';
import Lock from 'popup/svgs/Lock';

import * as S from './styles';

const Menus = () => {
  const navigate = useNavigate();
  const handleLock = () => {
    lockAction(navigate);
  };

  const buttons = [
    {
      link: RouteName.CreateWallet,
      icon: <Plus />,
      label: 'Create Wallet',
    },
    {
      link: RouteName.RestoreWallet,
      icon: <File />,
      label: 'Import Wallet',
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
