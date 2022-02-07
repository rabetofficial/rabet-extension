import React from 'react';
import shortid from 'shortid';
import {useNavigate} from 'react-router-dom';
import * as route from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';

import * as S from './styles';

const Menus = () => {
  const navigate = useNavigate();
  const handleLock = () => {
    lockAction(navigate);
  };

  const buttons = [
    {
      link: route.createWalletPage,
      icon: 'icon-plus-math',
      iconSize: '14',
      label: 'Create Wallet',
    },
    {
      link: route.restoreWalletPage,
      icon: 'icon-file',
      iconSize: '14',
      label: 'Import Wallet',
    },
    {
      link: route.settingPage,
      icon: 'icon-settings-2',
      iconSize: '15',
      label: 'Setting',
    },
    {
      link: '#',
      icon: 'icon-lock-2',
      iconSize: '15',
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
            <span
              className={item.icon}
              style={{ fontSize: `${item.iconSize}px` }}
            />
            {item.label}
          </S.GroupLink>
        ))}
      </S.Group>
    </div>
  );
};

export default Menus;
