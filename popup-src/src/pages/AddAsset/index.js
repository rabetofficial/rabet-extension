import React from 'react';

import Tabs from 'Root/components/Tabs';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';

import CustomAsset from './CustomAsset';
import SearchAsset from './SearchAsset';

import styles from './styles.less';

const AddAsset = ({history}) => {
  const tabs = [
    {
      id : '1',
      tabTitle: 'Search',
      tabContent: <SearchAsset history={history} />,
    },
    {
      id : '2',
      tabTitle: 'Custom Assets',
      tabContent: <CustomAsset history={history} />
    },
  ];

  return (
      <div className={ styles.div }>
        <Header/>

        <PageTitle title="Add assets" />
        <div className={styles.tab}>
          <Tabs data={ tabs } />
        </div>
      </div>
  );
};

export default AddAsset;
