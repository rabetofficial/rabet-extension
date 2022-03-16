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
        <>
          <div className="text-sm flex justify-end mt-2 px-4">
            <Link to={RouteName.AddAsset}>+ Add assets</Link>
          </div>
          <AssetList scrollMaxHeight={192} usage="extension" />
        </>
      ),
    },
    {
      id: '2',
      title: 'Transactions',
      content: (
        <div className="px-4">
          <Transactions scrollMaxHeight={220} usage="extension" />
        </div>
      ),
    },
  ];

  return (
    <Tabs
      data={tabs}
      isEqualWidth
      style={{ margin: '0 16px' }}
      titleClass="mt-[10px]"
    />
  );
};

export default TabList;
