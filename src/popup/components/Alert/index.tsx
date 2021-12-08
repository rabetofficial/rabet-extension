import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

interface AlertProps {
  type: string,
  text: string
}

const Alert = ({ type, text }: AlertProps) => {
  let iconStyle = '';

  if (type === 'alert-warning') {
    iconStyle = 'icon-exclamation-circle';
  }

  return (
    <div className={classNames(styles.alert, type)}>
      <div className="flex-parent">
        <span className={iconStyle} />
        <div>{text}</div>
      </div>
    </div>
  );
}

export default Alert;
