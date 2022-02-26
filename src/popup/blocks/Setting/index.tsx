import React, { useState } from 'react';
import AngleRight from 'popup/svgs/AngleRight';

import * as S from './styles';
import General from './General';
import ChangePassword from './ChangePassword';
import Contacts from './Contacts';
import Backup from './Backup';
import About from './About';

type SettingPage = {
  title: string;
  description: string;
  onClick: () => void;
};

const Setting = () => {
  const changeContent = (element: JSX.Element) => {
    setCurrentElement(element);
  };

  const description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing';

  const settingList: SettingPage[] = [
    {
      title: 'General',
      description,
      onClick: () => {
        changeContent(<General />);
      },
    },
    {
      title: 'Change Password',
      description,
      onClick: () => {
        changeContent(
          <ChangePassword
            onClick={() => {}}
            onClose={() => {}}
            onSubmit={() => {}}
          />,
        );
      },
    },
    {
      title: 'Backup',
      description,
      onClick: () => {
        changeContent(<Backup onSubmit={() => {}} />);
      },
    },
    {
      title: 'Contacts',
      description,
      onClick: () => {
        changeContent(<Contacts />);
      },
    },
    {
      title: 'About',
      description,
      onClick: () => {
        changeContent(<About />);
      },
    },
  ];

  const SettingMainPage = () => (
    <>
      {settingList.map((settingPg) => (
        <S.Container onClick={settingPg.onClick}>
          <S.TopContainer>
            <S.Title>{settingPg.title}</S.Title>
            <span>
              <AngleRight />
            </span>
          </S.TopContainer>
          <S.Description>{settingPg.description}</S.Description>
        </S.Container>
      ))}
    </>
  );

  const [currentElement, setCurrentElement] = useState(
    <SettingMainPage />,
  );

  return <>{currentElement}</>;
};

export default Setting;
