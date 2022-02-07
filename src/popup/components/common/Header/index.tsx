import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import * as route from 'popup/staticRes/routes';
import logo from '../../../../assets/images/logo.svg';

import styles from './styles.less';
import PopupSearch from './PopupSearch';
import Network from './Network';

const Header = () => {
  const [overlay, toggleOverLay] = useState<boolean>(false);

  const toggleOverlay = (open: boolean) => {
    toggleOverLay(open);
  };
  return (
    <>
      <div
        className="overlay"
        style={{ opacity: overlay ? '1' : '0' }}
        onClick={() => {
          toggleOverlay(false);
        }}
      />
      <div className={styles.comp}>
        <div className={styles.header}>
          <div className="pure-g" style={{ position: 'relative' }}>
            <div className="pure-u-4-24">
              <Link to={route.homePage}>
                <img src={logo} alt="logo" className={styles.logo} />
              </Link>
            </div>
            <div className="pure-u-16-24">
              <Network />
            </div>
            <div className="pure-u-4-24">
              <PopupSearch
                toggleOverlay={toggleOverlay}
                isOpen={overlay}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: '60px' }} />
    </>
  );
};

export default Header;
