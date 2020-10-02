import React from 'react';
import PropTypes from 'prop-types';

import Header from 'Root/components/Header';
import * as route from 'Root/staticRes/routes';
import PageTitle from 'Root/components/PageTitle';
import NoteCard from 'Root/pageComponents/NoteCard';

import styles from './styles.less';

const Error = props => {
  return (
      <>
        <Header/>

        <PageTitle/>

        <div className={ styles.card }>
          <NoteCard
            title="Error"
            message={props.history.location.state.hash || 'ERROR!'}
            btnText="Got it"
            icon="icon-exclamation-triangle"
            iconClass={ styles.icon }
            handleClick={() => { props.history.push(route.homePage) }}
          />
        </div>
      </>
  );
};

Error.propTypes = {

};

export default Error;
