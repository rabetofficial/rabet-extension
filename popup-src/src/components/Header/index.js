import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import logo from 'Root/assets/images/logo.svg';
import PopupSelect from './PopupSelect';
import styles from './styles.less';

const Header = props => {
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
                <Link to="/"><img src={ logo } alt="logo" className={ styles.logo } /></Link>
              </div>
              <div className="pure-u-15-24">
                <PopupSelect toggleOverlay={ toggleOverlay }/>
              </div>
              <div className="pure-u-3-24"><a href="" className={ styles.icon }><span className="icon-setting" /></a></div>
              <div className="pure-u-2-24"><a href="" className={ styles.icon }><span className="icon-lock" /></a></div>
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
