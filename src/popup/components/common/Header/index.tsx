import classNames from 'classnames';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import RabetLogo from 'popup/svgs/RabetLogo';
import RouteName from 'popup/staticRes/routes';

import * as S from './styles';
import Network from './Network';
import SearchAccounts from './SearchAccounts';

const Header = () => {
  const [overlay, toggleOverLay] = useState<boolean>(false);

  const toggleOverlay = (open: boolean) => {
    toggleOverLay(open);
  };
  return (
    <>
      <div
        className={classNames('overlay', overlay && 'show-overlay')}
        onClick={() => {
          toggleOverlay(false);
        }}
      />
      <S.Header>
        <div className="flex justify-between items-center relative">
          <Link to={RouteName.Home}>
            <RabetLogo />
          </Link>

          <Network theme="dark" />

          <SearchAccounts
            usage="extension"
            isOpen={overlay}
            toggleOverlay={toggleOverlay}
          />
        </div>
      </S.Header>
    </>
  );
};

export default Header;
