import React, { useState } from 'react';

import Tabs from 'popup/components/common/Tabs';
import addAssetAction from 'popup/actions/operations/addAsset';

import { Tab } from 'popup/models';
import SearchAsset from './SearchAsset';
import CustomAsset, { FormValues } from './CustomAsset';

type AddAssetType = {
  children?: React.ReactNode;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddAsset = ({ children, setModal }: AddAssetType) => {
  const [messageResult, setMessageResult] = useState('');

  const handleSubmit = async (values: FormValues) => {
    if (setModal) {
      setModal(false);
    }

    // SHOW LOADING NETWORK MODAL

    const [isSuccessful, message] = await addAssetAction(
      values.code,
      values.issuer,
      values.limit,
    );

    setMessageResult(message);

    // STOP SHOWING LOADING NETWORK MODAL

    if (isSuccessful) {
      // SHOW SUCCESS MODAL
      // WITH MESSAGE
    } else {
      // SHOW ERROR MODAL
      // WITH MESSAGE
    }

    return values;
  };

  const handleCancel = () => {
    if (setModal) {
      setModal(false);
    }
  };

  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Search',
      content: (
        <SearchAsset
          key="searchAsset"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      ),
    },
    {
      id: '2',
      title: 'Custom Asset',
      content: (
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

      <Tabs data={tabs} isEqualWidth />
    </div>
  );
};
AddAsset.defaultProps = {
  children: '',
  setModal: () => {},
};
export default AddAsset;
