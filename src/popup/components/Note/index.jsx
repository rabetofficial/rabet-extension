import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

const Note = ({ children, variant, text }) => (
  <>
    {!text ? <div className={styles.note}>{children}</div> : (
      <div className={classNames(styles.box, styles[`${variant}`])}>
        {variant === 'warn' ? <span className={classNames('icon-exclamation-circle', styles.icon)} /> : null}
        <span>{text}</span>
      </div>
    )}
  </>
);

export default Note;
