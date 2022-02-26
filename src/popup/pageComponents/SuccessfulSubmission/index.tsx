import React from 'react';

import styled from 'styled-components';
import NoteCard from 'popup/pageComponents/NoteCard';
import CopyText from 'popup/components/CopyText';
import createTab from 'popup/utils/createTab';
import BlackCheck from 'popup/svgs/BlackCheck';
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
    // cursor: pointer;
    display: inline-flex;
  `;

  const copyText = (
    <>
      <CopyText text={message} button={message} />
      <ShareLink
        onClick={() => {
          createTab(explorer(message));
        }}
      >
        <ShareArrowSquare />
      </ShareLink>
    </>
  );

  return (
    <NoteCard
      title="Transaction Sent"
      message={message ? copyText : 'SUCCESS!'}
      btnText="OK"
      icon={<BlackCheck />}
      onClick={onClick}
    />
  );
};

export default SuccessfulSubmission;
