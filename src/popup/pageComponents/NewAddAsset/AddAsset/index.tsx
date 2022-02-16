import React, { useState } from 'react';

import Tabs from 'popup/components/Tabs';
import ModalDialog from 'popup/components/common/ModalDialog';
import CustomAsset from './CustomAsset';
import SearchAsset from './SearchAsset';

type AddAssetType = { children: React.ReactNode };

const AddAsset = (props: AddAssetType) => {
  const { children } = props;

  const handleSubmit = () => {
    console.log('hey');
  };
  const handleCancel = () => {
    console.log('hey');
  };
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);
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
      <div>
        <button onClick={onOpenModal}>opennnn</button>
      </div>
      <ModalDialog
        title="Add asset"
        size="medium"
        padding="large"
        onClose={onCloseModal}
        isOpen={modal}
      >
        <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />
      </ModalDialog>
    </div>
  );
};

export default AddAsset;
