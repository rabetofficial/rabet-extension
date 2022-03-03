import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import AssetList from 'popup/pageComponents/AssetList';
import TransactionList from 'popup/pageComponents/TransactionList';

const TabList = ({ balances, editName }) => {
  const tabs = [
    {
      id: '1',
      title: 'Assets',
      content: (
        <AssetList
          items={balances}
          maxHeight={editName ? 205 : 214}
        />
      ),
    },
    {
      id: '2',
      title: 'Transactions',
      content: <TransactionList maxHeight={editName ? 215 : 221} />,
    },
  ];

  return <Tabs data={tabs} isEqualWidth titleClass="mt-[16px]" />;
};

export default TabList;
