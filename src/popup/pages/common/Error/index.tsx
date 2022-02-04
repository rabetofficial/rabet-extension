import React from 'react';

import NoteCard from 'popup/pageComponents/NoteCard';

import styles from './styles.less';

type ErrorProps = {
  error: string;
  handleClick: () => void;
};

const Error = ({ handleClick, error }: ErrorProps) => (
  <div>
    <NoteCard
      title="Error"
      message={error || 'ERROR!'}
      btnText="Got it"
      icon="icon-exclamation-triangle"
      iconClass={styles.icon}
      handleClick={handleClick}
    />
  </div>
);

export default Error;
