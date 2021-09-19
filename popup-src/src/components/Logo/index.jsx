import React from 'react';

import logo from '../../assets/images/text-logo.svg';

import styles from './styles.less';

const Logo = () => (
  <img src={logo} alt="logo" className={styles.logo} />
);

export default Logo;
