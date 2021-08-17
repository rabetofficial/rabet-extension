import shortid from 'shortid';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './styles.less';

const DropMenu = ({ children, width, items }) => {
  const [active, setActive] = useState(false);
  const toggle = () => setActive(!active);
  const close = () => setActive(false);

  return (
    <div className={styles.drop}>
      <div className="dropdown-menu" tabIndex={0} onBlur={close}>
        <div className={`toggle ${active ? 'active' : ''}`} onClick={toggle}>{children}</div>
        <div className={`menu ${active ? 'expanded' : 'collapsed'} `} style={{ width: active && `${width}px` }}>
          <ul>
            {items.map((i) => (
              <li
                className={i.className}
                key={shortid.generate()}
                onClick={() => { i.onClick(); toggle(); }}
              >
                <>
                  {typeof i.icon === 'string' ? <i className={i.icon} /> : i.icon}
                </>
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
};

export default DropMenu;
