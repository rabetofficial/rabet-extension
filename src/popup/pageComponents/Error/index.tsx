import React from 'react';

import NoteCard from 'popup/pageComponents/NoteCard';
import ExclamationTriangle from 'popup/svgs/ExclamationTriangle';

export type ErrorProps = {
  message: string;
  onClick: () => void;
};

const Error = ({ onClick, message }: ErrorProps) => (
  <div>
    <NoteCard
      title="Error"
      message={message || 'ERROR!'}
      icon={<ExclamationTriangle />}
      btnText="Got it"
      onClick={onClick}
    />
  </div>
);

export default Error;
