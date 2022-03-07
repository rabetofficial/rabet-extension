import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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

type SettingProps = {
  isExtension?: boolean;
};

const Setting = ({ isExtension }: SettingProps) => {
  const { state } = useLocation();

  const changeContent = (element: JSX.Element) => {
    setCurrentElement(element);
  };

  const showMainPage = () => {
    changeContent(<SettingMainPage />);
  };

  const settingPageContents = {
    '1': <General onClose={showMainPage} />,
    '2': <ChangePassword onClose={showMainPage} />,
    '3': <Backup onClose={showMainPage} />,
    '4': (
      <Contacts onClose={showMainPage} isExtension={isExtension} />
    ),
    '5': <About onClose={showMainPage} />,
  };

  const settingList: SettingPage[] = [
    {
      id: '1',
      title: 'General',
      description: 'Currency conversion, Mode, Explorer',
      onClick: () => {
        changeContent(settingPageContents['1']);
      },
    },
    {
      id: '2',
      title: 'Change password',
      description: 'Change your wallet password',
      onClick: () => {
        changeContent(settingPageContents['2']);
      },
    },
    {
      id: '3',
      title: 'Backup',
      description: 'Get a backup of all your imported wallets',
      onClick: () => {
        changeContent(settingPageContents['3']);
      },
    },
    {
      id: '4',
      title: 'Contacts',
      description: 'Add, edit, delete and manage your contacts',
      onClick: () => {
        changeContent(settingPageContents['4']);
      },
    },
    {
      id: '5',
      title: 'About',
      description: 'Version, Contact info, Community',
      onClick: () => {
        changeContent(settingPageContents['5']);
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

  const [currentElement, setCurrentElement] = useState(() => {
    if (state?.defaultPage) {
      const elementToBeRendered =
        settingPageContents[state?.defaultPage];

      if (elementToBeRendered) {
        return elementToBeRendered;
      }

      return <SettingMainPage />;
    }

    return <SettingMainPage />;
  });

  return <>{currentElement}</>;
};

Setting.defaultProps = {
  isExtension: false,
};

export default Setting;
