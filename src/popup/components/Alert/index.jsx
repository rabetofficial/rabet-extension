import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.less';

const Alert = ({ type, text }) => (
  <div className={classNames(styles.alert, type)}>
    <div className="flex-parent">
      <span className={type === 'alert-warning' && 'icon-exclamation-circle'} />
      <div>{text}</div>
    </div>
  </div>
);

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Alert;
