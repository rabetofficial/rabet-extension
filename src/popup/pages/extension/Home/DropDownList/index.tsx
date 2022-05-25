import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import PenEdit from 'popup/svgs/PenEdit';
import ExpandIcon from 'popup/svgs/Expand';
import HandCoins from 'popup/svgs/HandCoins';
import RouteName from 'popup/staticRes/routes';
import worldSrc from 'src/assets/images/world.svg';
import trashSrc from 'src/assets/images/trash-delete.svg';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import DropMenu from './DropMenu';

type DropDawnProps = {
  setEditableName: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDownList = ({ setEditableName }: DropDawnProps) => {
  const navigate = useNavigate();
  const { mode } = useTypedSelector((store) => store.options);
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
      label: 'Edit Name',
      icon: <PenEdit size="16" />,
      onClick: () => {
        setEditableName(true);
      },
    },
    {
      id: 2,
      label: 'Expand view',
      icon: <ExpandIcon />,
      onClick: () => {
        openInNewTab(chrome.runtime.getURL('dist/popup.html#/'));
      },
    },
    {
      id: 3,
      label: 'Show private key',
      icon: 'icon-key',
      onClick: () => {
        navigate(RouteName.ShowPrivateKey);
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
    // {
    //   id: 5,
    //   label: 'Claimable balance',
    //   icon: <HandCoins />,
    //   onClick: () => {
    //     navigate(RouteName.AdvancedOperation);
    //   },
    // },
    {
      id: 6,
      label: <p className="text-error">Delete account</p>,
      icon: <img src={trashSrc} alt="icon" />,
      onClick: () => {
        navigate(RouteName.DeleteAccount);
      },
    },
  ];

  if (mode === 'ADVANCED') {
    dropMenuItems.splice(2, 0, {
      id: 3,
      label: 'Show flags',
      icon: 'icon-flag',
      onClick: () => {
        navigate(RouteName.Flags);
      },
    });
  }

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
