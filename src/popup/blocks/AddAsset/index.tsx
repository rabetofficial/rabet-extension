import React from 'react';

import timeout from 'popup/utils/timeout';
import {
  openErrorModal,
  openSucessModal,
  openLoadingModal,
} from 'popup/components/Modals';
import Tabs from 'popup/components/common/Tabs';
import closeModalAction from 'popup/actions/modal/close';
import addAssetAction from 'popup/actions/operations/addAsset';
import { AssetImageWithActive } from 'popup/reducers/assetImages';
import addMultipleAssets from 'popup/actions/operations/addMultipleAssets';

import { Tab } from 'popup/models';
import SearchAsset from './SearchAsset';
import CustomAsset, { FormValues } from './CustomAsset';

type AddAssetType = {
  children?: React.ReactNode;
};

const AddAsset = ({ children }: AddAssetType) => {
  const handleCustomAssetSubmitBtn = async (values: FormValues) => {
    closeModalAction();

    await timeout(200);

    openLoadingModal({});

    const [isSuccessful, message] = await addAssetAction(
      values.code,
      values.issuer,
      values.limit,
    );

    closeModalAction();

    await timeout(100);

    if (isSuccessful) {
      openSucessModal({
        message,
        onClick: closeModalAction,
      });
    } else {
      openErrorModal({
        message,
        onClick: closeModalAction,
      });
    }

    return values;
  };

  const handleSearchAssetSubmitBtn = async (
    assets: AssetImageWithActive[],
  ) => {
    const result = await addMultipleAssets(assets);

    const isSuccessful = result[0];
    const message = result[1];

    closeModalAction();

    await timeout(200);

    openLoadingModal({});

    if (isSuccessful) {
      openSucessModal({
        message,
        onClick: closeModalAction,
      });
    } else {
      openErrorModal({
        message,
        onClick: closeModalAction,
      });
    }
  };

  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Search',
      content: (
        <SearchAsset
          key="searchAsset"
          onSubmit={handleSearchAssetSubmitBtn}
          onCancel={closeModalAction}
        />
      ),
    },
    {
      id: '2',
      title: 'Custom Asset',
      content: (
        <CustomAsset
          key="customAsset"
          onSubmit={handleCustomAssetSubmitBtn}
          onCancel={closeModalAction}
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
