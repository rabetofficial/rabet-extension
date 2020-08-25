import React, {useState} from 'react';
import {Link} from 'react-router-dom';

import * as route from 'Root/staticRes/routes';
import logo from 'Root/assets/images/logo.svg';
import logoutUserAction from 'Root/actions/user/logout';

import styles from './styles.less';
import PopupSelect from './PopupSelect';

const Header = () => {
  const [overlay, toggleOverLay] = useState(false);
  const toggleOverlay= (open) => {toggleOverLay(open);};
  return (
      <>
        <div
          className="overlay"
          style={ {display: overlay ? 'block': 'none'} }
          onClick={ () => {toggleOverlay(false);} }
        />
        <div className={ styles.comp }>
          <div className={ styles.header }>
            <div className="pure-g">
              <div className="pure-u-4-24">
                <Link to="/home"><img src={ logo } alt="logo" className={ styles.logo } /></Link>
              </div>
              <div className="pure-u-15-24">
                <PopupSelect toggleOverlay={ toggleOverlay }/>
              </div>
              <div className="pure-u-3-24"><Link to={route.settingPage} className={ styles.icon }><span className="icon-setting" /></Link></div>
              <div
                className="pure-u-2-24"
              >
                <Link to="#" className={ styles.icon } onClick={() => { logoutUserAction(); }}>
                  <span className="icon-lock" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div style={ {height: '60px'} } />
      </>
  );
};

Header.propTypes = {

};

export default Header;
