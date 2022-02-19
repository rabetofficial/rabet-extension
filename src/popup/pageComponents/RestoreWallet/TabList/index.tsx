import React from 'react';

import Tabs from 'popup/components/Tabs';
import PrivateKey from 'popup/pageComponents/PrivateKey';
import ImportBackupFile from 'popup/pageComponents/ImportBackupFile';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      tabTitle: 'Private key',
      tabContent: (
        <PrivateKey
          onCancel={() => console.log('hi')}
          onSubmit={() => console.log('hi')}
        />
      ),
    },
    {
      id: '2',
      tabTitle: 'Backup file',
      tabContent: <ImportBackupFile />,
    },
  ];

  return <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />;
};

export default TabList;
