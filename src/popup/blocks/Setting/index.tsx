import React, { useState } from 'react';

import AngleRight from 'popup/svgs/AngleRight';

import About from './About';
import * as S from './styles';
import Backup from './Backup';
import General from './General';
import Contacts from './Contacts';
import ChangePassword from './ChangePassword';

type SettingPage = {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
};

const Setting = () => {
  const changeContent = (element: JSX.Element) => {
    setCurrentElement(element);
  };

  const showMainPage = () => {
    changeContent(<SettingMainPage />);
  };

  const settingList: SettingPage[] = [
    {
      id: '1',
      title: 'General',
      description: 'Currency conversion, Mode, Explorer',
      onClick: () => {
        changeContent(<General onClose={showMainPage} />);
      },
    },
    {
      id: '2',
      title: 'Change password',
      description: 'Change your wallet password',
      onClick: () => {
        changeContent(<ChangePassword onClose={showMainPage} />);
      },
    },
    {
      id: '3',
      title: 'Backup',
      description: 'Get a backup of all your imported wallets',
      onClick: () => {
        changeContent(<Backup onClose={showMainPage} />);
      },
    },
    {
      id: '4',
      title: 'Contacts',
      description: 'Add, edit, delete and manage your contacts',
      onClick: () => {
        changeContent(<Contacts onClose={showMainPage} />);
      },
    },
    {
      id: '5',
      title: 'About',
      description: 'Version, Contact info, Community',
      onClick: () => {
        changeContent(<About onClose={showMainPage} />);
      },
    },
  ];

  const SettingMainPage = () => (
    <S.ContainerBox>
      {settingList.map((settingPg, index) => (
        <div key={`setting${settingPg.id}`}>
          <S.Container onClick={settingPg.onClick}>
            <S.TopContainer>
              <S.Title>{settingPg.title}</S.Title>
              <span>
                <AngleRight />
              </span>
            </S.TopContainer>
            <S.Description>{settingPg.description}</S.Description>
          </S.Container>
          {settingList.length !== index + 1 && <S.Hr />}
        </div>
      ))}
    </S.ContainerBox>
  );

  const [currentElement, setCurrentElement] = useState(
    <SettingMainPage />,
  );

  return <>{currentElement}</>;
};

export default Setting;
