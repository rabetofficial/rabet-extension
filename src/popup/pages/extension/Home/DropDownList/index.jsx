import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  flagPage,
  deleteAccountPage,
  ShowPrivateKeyPage,
  connectedWebsitePage,
} from '../../../../staticRes/routes';
import DropMenu from '../../../../components/DropMenu';
import worldSrc from '../../../../../assets/images/world.svg';
import trashSrc from '../../../../../assets/images/trash-delete.svg';

import styles from './styles.less';

const DropDownList = () => {
  const navigate = useNavigate();

  const dropMenuItems = [
    {
      label: 'Show private key',
      icon: 'icon-key',
      onClick: () => {
        navigate(ShowPrivateKeyPage);
      },
    },
    {
      label: 'Show flags',
      icon: 'icon-flag',
      onClick: () => {
        navigate(flagPage);
      },
    },
    {
      label: 'Connected sites',
      icon: <img src={worldSrc} alt="icon" />,
      onClick: () => {
        navigate(connectedWebsitePage);
      },
    },
    {
      label: 'Delete account',
      icon: <img src={trashSrc} alt="icon" />,
      onClick: () => {
        navigate(deleteAccountPage);
      },
      className: styles.delete,
    },
  ];

  return (
    <DropMenu width={198} items={dropMenuItems}>
      <a className={styles.expand}>
        <span className="icon-expand-more" />
      </a>
    </DropMenu>
  );
};

export default DropDownList;
