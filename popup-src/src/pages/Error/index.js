import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Root/components/Header';
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
            message={ 'Your received address is not allowed for this token'.toUpperCase() }
            btnText="Got it"
            icon="icon-exclamation-triangle"
            iconClass={ styles.icon }
          />
        </div>
      </>
  );
};

Error.propTypes = {

};

export default Error;
