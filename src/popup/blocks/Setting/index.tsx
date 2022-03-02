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

  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor';

  const settingList: SettingPage[] = [
    {
      id: '1',
      title: 'General',
      description,
      onClick: () => {
        changeContent(<General onClose={showMainPage} />);
      },
    },
    {
      id: '2',
      title: 'Change password',
      description,
      onClick: () => {
        changeContent(<ChangePassword onClose={showMainPage} />);
      },
    },
    {
      id: '3',
      title: 'Backup',
      description,
      onClick: () => {
        changeContent(<Backup onClose={showMainPage} />);
      },
    },
    {
      id: '4',
      title: 'Contacts',
      description,
      onClick: () => {
        changeContent(<Contacts onClose={showMainPage} />);
      },
    },
    {
      id: '5',
      title: 'About',
      description,
      onClick: () => {
        changeContent(<About onClose={showMainPage} />);
      },
    },
  ];

  const SettingMainPage = () => (
    <>
      {settingList.map((settingPg, index) => (
        <>
          <S.Container
            onClick={settingPg.onClick}
            key={`setting${settingPg.id}`}
          >
            <S.TopContainer>
              <S.Title>{settingPg.title}</S.Title>
              <span>
                <AngleRight />
              </span>
            </S.TopContainer>
            <S.Description>{settingPg.description}</S.Description>
          </S.Container>
          {settingList.length !== index + 1 && <S.Hr />}
        </>
      ))}
    </>
  );

  const [currentElement, setCurrentElement] = useState(
    <SettingMainPage />,
  );

  return <>{currentElement}</>;
};

export default Setting;
