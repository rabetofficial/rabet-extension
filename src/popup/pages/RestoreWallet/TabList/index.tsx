import React from 'react';

import Tabs from 'popup/components/Tabs';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      tabTitle: 'Private key',
    },
    {
      id: '2',
      tabTitle: 'Backup file',
    },
  ];

  return <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />;
};

export default TabList;
