import React from 'react';

import Loading from 'popup/components/Loading';
import openModalAction from 'popup/actions/modal/open';
import Error, { ErrorProps } from 'popup/pageComponents/Error';
import SuccessfulSubmission, {
  SuccessfulSubmissionType,
} from 'popup/pageComponents/SuccessfulSubmission';

export const openLoadingModal = ({
  message,
}: {
  message?: string;
}) => {
  openModalAction({
    minHeight: 0,
    isStyled: false,
    size: 'medium',
    title: '',
    padding: 'medium',
    children: (
      <Loading
        size={65}
        title={message || 'Sending to network'}
        titleStyle="mt-3"
      />
    ),
  });
};

export const openErrorModal = ({ message, onClick }: ErrorProps) => {
  openModalAction({
    minHeight: 0,
    isStyled: false,
    size: 'medium',
    title: '',
    padding: 'medium',
    children: <Error onClick={onClick} message={message} />,
  });
};

export const openSucessModal = ({
  message,
  onClick,
}: SuccessfulSubmissionType) => {
  openModalAction({
    minHeight: 0,
    isStyled: false,
    size: 'medium',
    title: '',
    padding: 'medium',
    children: (
      <SuccessfulSubmission onClick={onClick} message={message} />
    ),
  });
};
