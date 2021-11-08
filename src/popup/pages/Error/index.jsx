import React from 'react';

import Header from '../../components/Header';
import * as route from '../../staticRes/routes';
import PageTitle from '../../components/PageTitle';
import NoteCard from '../../pageComponents/NoteCard';

import styles from './styles.less';

const Error = ({ history }) => (
  <>
    <Header />

    <PageTitle />

    <div>
      <NoteCard
        title="Error"
        message={history.location.state.message || 'ERROR!'}
        btnText="Got it"
        icon="icon-exclamation-triangle"
        iconClass={styles.icon}
        handleClick={() => {
          history.push(
            route.homePage,
            {
              alreadyLoaded: true,
            },
          );
        }}
      />
    </div>
  </>
);

Error.propTypes = {

};

export default Error;
