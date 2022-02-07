import React from 'react';
import shortid from 'shortid';
import {Link, useNavigate} from 'react-router-dom';
import styles from './styles.less';
import * as route from 'popup/staticRes/routes';
import lockAction from 'popup/actions/accounts/lock';

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
      <div className={styles.group}>
        {buttons.map((item) => (
          <Link
            key={shortid.generate()}
            to={item.link}
            className={styles.link}
            onClick={item.onClick}
          >
            <span
              className={item.icon}
              style={{ fontSize: `${item.iconSize}px` }}
            />
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menus;
