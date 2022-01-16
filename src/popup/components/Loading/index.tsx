import React from 'react';
import PropTypes from 'prop-types';

import loading from '../../../assets/images/loading.svg';

import styles from './styles.less';

type AppProps = {
    title: string
    size: number
}

const Loading = ({ title, size }: AppProps) => (
  <>
    <img
      src={loading}
      className={styles.loading}
      alt="loading"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
    {title && <p className={styles.title}>{title}</p>}
  </>
);

Loading.defaultProps = {
  title: '',
};

Loading.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number.isRequired,
};

export default Loading;
