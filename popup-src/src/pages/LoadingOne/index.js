import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'Root/components/Logo';
import Loading from 'Root/components/Loading';
import styles from './styles.less';

const LoadingOne = props => {
  return (
      <div style={ { marginTop: '167px'} }>
       <Logo/>
       <div className={styles.loading}>
         <Loading size={ 58 } />
       </div>
      </div>
  );
};

LoadingOne.propTypes = {

};

export default LoadingOne;
