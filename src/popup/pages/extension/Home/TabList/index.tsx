import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import AssetList from 'popup/components/common/Layouts/ExpandLayout/AssetList';
import Transactions from 'popup/components/Transactions';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      title: 'Assets',
      content: (
        <>
          <AssetList scrollMaxHeight={232} usage="extension" />
        </>
      ),
    },
    {
      id: '2',
      title: 'Transactions',
      content: (
        <div className="px-4">
          <Transactions scrollMaxHeight={278} usage="extension" />
        </div>
      ),
    },
  ];

  return <Tabs data={tabs} isEqualWidth titleClass="mt-[10px]" />;
};

export default TabList;
