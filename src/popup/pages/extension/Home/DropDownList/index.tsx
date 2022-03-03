import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  flagPage,
  deleteAccountPage,
  ShowPrivateKeyPage,
  connectedWebsitePage,
} from 'popup/staticRes/routes';
import DropMenu from 'popup/components/DropMenu';
import worldSrc from 'src/assets/images/world.svg';
import Trash from 'popup/svgs/Trash';

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
      label: <p className="text-error">Delete account</p>,
      icon: <Trash />,
      onClick: () => {
        navigate(deleteAccountPage);
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
