import React, { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import * as route from 'popup/staticRes/routes';
import FullRabetLogo from 'popup/svgs/FullRabetLogo';
import Network from 'popup/components/common/Header/Network';
import SearchAccounts from 'popup/components/common/Header/SearchAccounts';

const HeaderBlock = () => {
  const [overlay, toggleOverLay] = useState<boolean>(false);

  const toggleOverlay = (open: boolean) => toggleOverLay(open);

  return (
    <>
      <div
        className={classNames('overlay', overlay && 'show-overlay')}
        onClick={() => {
          toggleOverlay(false);
        }}
      />
      <div className="flex justify-between items-center">
        <Link to={route.homePage}>
          <FullRabetLogo />
        </Link>
        <div className="flex items-center space-x-[22px]">
          <Network theme="light" />
          <SearchAccounts
            toggleOverlay={toggleOverlay}
            isOpen={overlay}
            usage="expand"
          />
        </div>
      </div>
    </>
  );
};

export default HeaderBlock;
