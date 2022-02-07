import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import * as route from 'popup/staticRes/routes';
import RabetLogo from 'popup/svgs/RabetLogo';
import SearchAccounts from './SearchAccounts';
import Network from './Network';

import * as S from './styles';

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
          <Link to={route.homePage}>
            <RabetLogo />
          </Link>
          <Network />
          <SearchAccounts
            toggleOverlay={toggleOverlay}
            isOpen={overlay}
          />
        </div>
      </S.Header>
    </>
  );
};

export default Header;
