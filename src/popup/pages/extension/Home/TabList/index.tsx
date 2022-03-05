import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import AssetList from 'popup/components/common/Layouts/ExpandLayout/AssetList';
import Transactions from 'popup/components/Transactions';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      title: 'Assets',
      content: <AssetList ScrollMaxHeight={200} />,
    },
    {
      id: '2',
      title: 'Transactions',
      content: <Transactions ScrollMaxHeight={200} />,
    },
  ];

  return (
    <Tabs
      data={tabs}
      isEqualWidth
      titleClass="mt-4"
      contentClass="px-4"
    />
  );
};

export default TabList;
