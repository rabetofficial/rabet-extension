import React from 'react';

import Tabs from 'popup/components/Tabs';
import ModalDialog from 'popup/components/common/ModalDialog';
import CustomAsset from './CustomAsset';
import SearchAsset from './SearchAsset';

type AddAssetType = {
  children?: React.ReactNode;
  CloseModal: () => void;
  OpenModal: any;
};

const AddAsset = (props: AddAssetType) => {
  const { children, CloseModal, OpenModal } = props;

  const handleSubmit = () => {
    console.log('hey');
  };
  const handleCancel = () => {
    console.log('hey');
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

      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={CloseModal}
        isOpen={OpenModal}
      >
        <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />
      </ModalDialog>
    </div>
  );
};

AddAsset.defaultProps = {
  children: '',
};
export default AddAsset;
