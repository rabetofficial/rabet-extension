import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Select from 'react-select';
import classNames from 'classnames';

import * as route from 'Root/staticRes/routes';
import logo from 'Root/assets/images/logo.svg';
import logoutUserAction from 'Root/actions/user/logout';
import PopupSelect from './PopupSelect';

import styles from './styles.less';

export const items = [
  { value: 'main', label: 'Main Network' },
  { value: 'test', label: 'Test Network' },
];


const Header = () => {
  const [overlay, toggleOverLay] = useState(false);
  const [selected, setSelected] = useState(items[0]);

  const onChangeNetwork = (e) => {
    setSelected(e);
  };
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
              <div className="pure-u-16-24">
               <div className={classNames(styles.select, (selected === items[0]) ? styles.main : styles.test)}>
                 <Select
                     classNamePrefix="net"
                     separator={ false }
                     closeMenuOnSelect={ true }
                     defaultValue={ items[0] }
                     options={ items }
                     hideSelectedOptions={ false }
                     isSearchable={ false }
                     backspaceRemovesValue={ false }
                     onChange={ (e) => onChangeNetwork(e) }
                     styles={ {
                       ...styles,
                       control: (base, state) => ({
                         ...base,
                         borderColor: state.isFocused ? 'black': 'black',
                         boxShadow: state.isFocused ? 0 : 0,
                         '&:hover': { borderColor: 'black' },
                       }),
                     } }
                 />
               </div>
              </div>
              <div className="pure-u-4-24">
                <PopupSelect toggleOverlay={ toggleOverlay }/>
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
