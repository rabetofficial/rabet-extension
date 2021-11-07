import React from 'react';

import Tabs from '../../../components/Tabs';
import AssetList from '../../../pageComponents/AssetList';
import TransactionList from '../../../pageComponents/TransactionList';

const TabList = ({ balances, editName }) => {
  const tabs = [
    {
      id: '1',
      tabTitle: 'Assets',
      tabContent: <AssetList items={balances} maxHeight={editName ? 205 : 214} />,
    },
    {
      id: '2',
      tabTitle: 'Transactions',
      tabContent: <TransactionList maxHeight={editName ? 215 : 221} />,
    },
  ];

  return (
    <Tabs data={tabs} tabTitleStyle={{ margin: '0 16px' }} />
  );
};

export default TabList;
