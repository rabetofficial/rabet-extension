import React from 'react';
import styled from 'styled-components';

import BlackCheck from 'popup/svgs/BlackCheck';
import NoteCard from 'popup/components/NoteCard';
import ShareArrowSquare from 'popup/svgs/ShareArrowSqaure';
import explorer from 'popup/utils/horizon/transactionLink';

export type SuccessfulSubmissionType = {
  onClick: () => void;
  message: string;
};

const SuccessfulSubmission = ({
  onClick,
  message,
}: SuccessfulSubmissionType) => {
  const ShareLink = styled.a`
    margin-left: 4px;
    cursor: pointer;
    display: inline-flex;
  `;

  const Text = (
    <>
      <span>{message}</span>
      <ShareLink
        href={explorer(message)}
        target="_blank"
        rel="noreferrer"
      >
        <ShareArrowSquare />
      </ShareLink>
    </>
  );

  return (
    <NoteCard
      title="Transaction Sent"
      message={message ? Text : 'SUCCESS!'}
      btnText="OK"
      icon={<BlackCheck />}
      onClick={onClick}
    />
  );
};

export default SuccessfulSubmission;
