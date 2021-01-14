import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.less';

const DropMenu = ({children, width, items}) => {
  const [active, setActive] =  useState(false);
  const toggle = () => setActive(!active);
  const close = () => setActive(false);

  return (
    <div className={ styles.drop }>
      <div className="dropdown-menu" tabIndex={ 0 } onBlur={ close }>
        <div className={ `toggle ${active ? 'active' : ''}` } onClick={ toggle }>{children}</div>
        <div className={ `menu ${active ? 'expanded' : 'collapsed'} ` } style={ {width: active && `${width}px`} }>
          <ul>
            {items.map((i,index) => (
                <li key={ index } onClick={ () => {i.onClick();toggle();} }>
                    <span>
                      <i className={ i.icon } />
                    </span>
                  <span className="label">{i.label}</span>
                </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

DropMenu.propTypes = {
  width: PropTypes.number.isRequired,
  items: PropTypes.array.isRequired,
};

export default DropMenu;
