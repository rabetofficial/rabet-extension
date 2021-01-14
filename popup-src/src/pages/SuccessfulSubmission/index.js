import React from 'react';
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

       <PageTitle alreadyLoaded={false} />

       <NoteCard
         title="Transaction Sent"
         message={props.history.location.state.hash || 'SUCCESS!'}
         btnText="OK"
         icon="icon-checkmark"
         iconClass={ styles.icon }
         handleClick={() => { props.history.push({
           pathname: route.homePage,
           state: {
             alreadyLoaded: false,
           }
         }) }}
         copy
       />
      </>
  );
};

SuccessfulSubmission.propTypes = {

};

export default withRouter(SuccessfulSubmission);
