import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import AssetList from 'popup/components/common/Layouts/ExpandLayout/AssetList';
import Transactions from 'popup/components/Transactions';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      title: 'Assets',
      content: <AssetList />,
    },
    {
      id: '2',
      title: 'Transactions',
      content: <Transactions ScrollMaxHight={320} />,
    },
  ];

  return <Tabs data={tabs} isEqualWidth titleClass="mt-4" />;
};

export default TabList;
