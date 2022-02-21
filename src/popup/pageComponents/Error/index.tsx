import React from 'react';

import NoteCard from 'popup/pageComponents/NoteCard';
import ExclamationTriangle from 'popup/svgs/ExclamationTriangle';

type ErrorProps = {
  message: string;
  handleClick: () => void;
};

const Error = ({ handleClick, message }: ErrorProps) => (
  <div>
    <NoteCard
      title="Error"
      message={message || 'ERROR!'}
      icon={<ExclamationTriangle />}
      btnText="Got it"
      onClick={handleClick}
    />
  </div>
);

export default Error;
