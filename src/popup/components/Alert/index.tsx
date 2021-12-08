import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

interface AlertProps {
  type: string,
  text: string
}

const Alert = ({ type, text }: AlertProps) => (
  <div className={classNames(styles.alert, type)}>
    <div className="flex-parent">
      <span className={type === 'alert-warning' ? 'icon-exclamation-circle' : ''} />
      <div>{text}</div>
    </div>
  </div>
);

export default Alert;
