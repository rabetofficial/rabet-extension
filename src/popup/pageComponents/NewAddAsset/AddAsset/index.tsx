import React from 'react';

import Tabs from 'popup/components/Tabs';
import addAssetAction from 'popup/actions/operations/addAsset';

import SearchAsset from './SearchAsset';
import CustomAsset, { FormValues } from './CustomAsset';

type AddAssetType = {
  children?: React.ReactNode;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddAsset = ({ children, setModal }: AddAssetType) => {
  const handleSubmit = async (values: FormValues) => {
    setModal(false);

    // SHOW LOADING NETWORK MODAL

    const [result, message] = await addAssetAction(
      values.code,
      values.issuer,
      values.limit,
    );

    if (result) {
      // SHOW SUCCESS MODAL
      // WITH MESSAGE
    } else {
      // SHOW ERROR MODAL
      // WITH MESSAGE
    }

    return values;
  };

  const handleCancel = () => {
    setModal(false);
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
