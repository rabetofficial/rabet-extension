import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from 'Root/components/Header';
import * as route from 'Root/staticRes/routes';
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
         message={props.history.location.state.hash || 'SUCCESS!'}
         btnText="OK"
         icon="icon-checkmark"
         iconClass={ styles.icon }
         handleClick={() => { props.history.push(route.homePage) }}
         copy
       />
      </>
  );
};

SuccessfulSubmission.propTypes = {

};

export default withRouter(SuccessfulSubmission);
