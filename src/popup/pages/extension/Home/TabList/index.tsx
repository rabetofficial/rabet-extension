import React from 'react';
import { Link } from 'react-router-dom';

import Tabs from 'popup/components/common/Tabs';
import AssetList from 'popup/components/common/Layouts/ExpandLayout/AssetList';
import Transactions from 'popup/components/Transactions';
import RouteName from 'popup/staticRes/routes';

const TabList = () => {
  const tabs = [
    {
      id: '1',
      title: 'Assets',
      content: (
        <div className="max-h-[200px]">
          <div className="text-sm flex justify-end mt-2">
            <Link to={RouteName.AddAsset}>+ Add asset</Link>
          </div>
          <AssetList scrollMaxHeight={175} isExtension />
        </div>
      ),
    },
    {
      id: '2',
      title: 'Transactions',
      content: (
        <div className="max-h-[200px]">
          <Transactions scrollMaxHeight={195} isExtention />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      data={tabs}
      isEqualWidth
      titleClass="mt-[10px]"
      contentClass="px-4"
    />
  );
};

export default TabList;
