import React from 'react';
import classNames from 'classnames';

import styles from './styles.less';

type NoteProps = {
  children: JSX.Element;
  variant?: 'warn';
  text?: string;
};

const Note = ({ children, variant, text }: NoteProps) => {
  if (!text) {
    return <div className={styles.note}>{children}</div>;
  }

  return (
    <div className={classNames(styles.box, styles[`${variant}`])}>
      {variant === 'warn' ? (
        <span
          className={classNames(
            'icon-exclamation-circle',
            styles.icon,
          )}
        />
      ) : null}
      <span>{text}</span>
    </div>
  );
};

export default Note;
