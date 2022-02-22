import React, { useState } from 'react';

import timeout from 'popup/utils/timeout';
import Tabs from 'popup/components/common/Tabs';
import closeModalAction from 'popup/actions/modal/close';
import openModalAction from 'popup/actions/modal/open';
import addAssetAction from 'popup/actions/operations/addAsset';

import { Tab } from 'popup/models';
import SearchAsset from './SearchAsset';
import CustomAsset, { FormValues } from './CustomAsset';

type AddAssetType = {
  children?: React.ReactNode;
};

const AddAsset = ({ children }: AddAssetType) => {
  const [messageResult, setMessageResult] = useState('');

  const handleSubmit = async (values: FormValues) => {
    closeModalAction();

    await timeout(100);

    // SHOW LOADING MODAL
    openModalAction({
      minHeight: 0,
      isStyled: true,
      size: 'medium',
      title: 'Receive',
      padding: 'large',
      children: <p>LOADING</p>,
    });

    const [isSuccessful, message] = await addAssetAction(
      values.code,
      values.issuer,
      values.limit,
    );

    setMessageResult(message);

    // STOP SHOWING LOADING NETWORK MODAL
    closeModalAction();

    await timeout(100);

    if (isSuccessful) {
      // SHOW SUCCESS MODAL
      // WITH MESSAGE
      openModalAction({
        minHeight: 0,
        isStyled: true,
        size: 'medium',
        title: 'SUCCESS',
        padding: 'large',
        children: <p>SUCCESS</p>,
      });
    } else {
      // SHOW ERROR MODAL
      // WITH MESSAGE
      openModalAction({
        minHeight: 0,
        isStyled: true,
        size: 'medium',
        title: 'ERROR',
        padding: 'large',
        children: <p>ERROR</p>,
      });
    }

    return values;
  };

  const handleCancel = () => {};

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
};

export default AddAsset;
