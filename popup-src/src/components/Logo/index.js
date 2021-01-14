import React from 'react';
import logo from 'Root/assets/images/text-logo.svg';
import styles from './styles.less';

const Logo = () => {
  return (
      <>
        <img src={ logo } alt="logo" className={ styles.logo }/>
      </>
  );
};

Logo.propTypes = {

};

export default Logo;
