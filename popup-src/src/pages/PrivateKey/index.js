import React from 'react';
import PropTypes from 'prop-types';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';
import NoteCard from 'Root/pageComponents/NoteCard';
import styles from './styles.less';

const PrivateKey = props => {
  return (
      <div className={ styles.note }>
        <Header/>
        <PageTitle />
        <NoteCard
          title="Your private key"
          message="kjbjksdbbjlsdbvlsdvdkbli84y2838909603say37ahkjc937330964"
          btnText="OK"
          icon="icon-key"
          iconClass={ styles.icon }
          copy
        />
      </div>
  );
};

PrivateKey.propTypes = {
  
};

export default PrivateKey;
