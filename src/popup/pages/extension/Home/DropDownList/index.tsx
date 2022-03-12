import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import ExpandIcon from 'popup/svgs/Expand';
import RouteName from 'popup/staticRes/routes';
import worldSrc from 'src/assets/images/world.svg';
import trashSrc from 'src/assets/images/trash-delete.svg';
import DropMenu from './DropMenu';

const DropDownList = () => {
  const navigate = useNavigate();

  const openInNewTab = (url: string) => {
    const newWindow = window.open(
      url,
      '_blank',
      'noopener,noreferrer',
    );
    if (newWindow) newWindow.opener = null;
  };

  const dropMenuItems = [
    {
      id: 1,
      label: 'Expand view',
      icon: <ExpandIcon />,
      onClick: () => {
        openInNewTab(chrome.runtime.getURL('dist/popup.html#/'));
      },
    },
    {
      id: 2,
      label: 'Show private key',
      icon: 'icon-key',
      onClick: () => {
        navigate(RouteName.ShowPrivateKey);
      },
    },
    {
      id: 3,
      label: 'Show flags',
      icon: 'icon-flag',
      onClick: () => {
        navigate(RouteName.Flags);
      },
    },
    {
      id: 4,
      label: 'Connected sites',
      icon: <img src={worldSrc} alt="icon" />,
      onClick: () => {
        navigate(RouteName.ConnectedWebsites);
      },
    },
    {
      id: 5,
      label: <p className="text-error">Delete account</p>,
      icon: <img src={trashSrc} alt="icon" />,
      onClick: () => {
        navigate(RouteName.DeleteAccount);
      },
    },
  ];

  return (
    <DropMenu width={198} items={dropMenuItems}>
      <Expand>
        <span className="icon-expand-more" />
      </Expand>
    </DropMenu>
  );
};

const Expand = styled.a`
  color: black;
  text-decoration: none !important;
  font-size: 17px;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
  width: 5px;
  margin-left: auto;

  &:focus {
    outline: none;
  }
`;

export default DropDownList;
