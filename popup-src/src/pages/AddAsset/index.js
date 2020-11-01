import React from 'react';

import Tabs from 'Root/components/Tabs';
import Header from 'Root/components/Header';
import PageTitle from 'Root/components/PageTitle';

import CustomAsset from './CustomAsset';

import styles from './styles.less';

const AddAsset = () => {
  const tabs = [
    {
      id : '1',
      tabTitle: 'Search',
      tabContent: 1,
    },
    {
      id : '2',
      tabTitle: 'Custom Assets',
      tabContent: <CustomAsset />
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
