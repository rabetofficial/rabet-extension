import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import NoteCard from 'Root/pageComponents/NoteCard';
import styles from './styles.less';

const SuccessfulSubmission = props => {
  return (
      <>
       <Header/>
       <PageTitle />
       <NoteCard
         title="Transaction Sent"
         message="kjbjksdbbjlsdbvlsdvdkbli84y2838909603say37ahkjc937330964"
         btnText="OK"
         icon="icon-checkmark"
         iconClass={ styles.icon }
         copy
       />
      </>
  );
};

SuccessfulSubmission.propTypes = {

};

export default SuccessfulSubmission;
