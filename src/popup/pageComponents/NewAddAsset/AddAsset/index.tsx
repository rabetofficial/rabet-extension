import React from 'react';

import RouteName from 'popup/staticRes/routes';
import { useNavigate } from 'react-router-dom';
import Tabs from 'popup/components/Tabs';
import CustomAsset from './CustomAsset';
import SearchAsset from './SearchAsset';

type AddAssetType = { children?: React.ReactNode };

const AddAsset = (props: AddAssetType) => {
  const { children } = props;
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log('pls handle this your own');
  };

  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };

  const tabs = [
    {
      id: '1',
      tabTitle: 'Search',
      tabContent: (
        <SearchAsset
          key="searchAsset"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      ),
    },
    {
      id: '2',
      tabTitle: 'Custom Asset',
      tabContent: (
        <CustomAsset
          key="customAsset"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      ),
    },
  ];

  return (
    <div>
      {children}

      <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />
    </div>
  );
};
AddAsset.defaultProps = {
  children: '',
};
export default AddAsset;
