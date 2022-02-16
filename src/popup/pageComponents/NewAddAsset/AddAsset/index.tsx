import React, { useState } from 'react';

import Tabs from 'popup/components/common/Tabs';
import PageTitle from 'popup/components/PageTitle';
import ModalDialog from 'popup/components/common/ModalDialog';
import { Tab } from 'popup/models';
import CustomAsset from './CustomAsset';
import SearchAsset from './SearchAsset';

const AddAsset = () => {
  const handleSubmit = () => {
    console.log('hey');
  };
  const handleCancel = () => {
    console.log('hey');
  };
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);
  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Search Asset',
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
        <Tabs data={tabs} isEqualWidth />
      </ModalDialog>
    </div>
  );
};

export default AddAsset;
