import React from 'react';
import { useNavigate } from 'react-router-dom';

import timeout from 'popup/utils/timeout';
import {
  openErrorModal,
  openSucessModal,
  openLoadingModal,
} from 'popup/components/Modals';
import RouteName from 'popup/staticRes/routes';
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
  isExtension?: boolean;
};

const AddAsset = ({ children, isExtension }: AddAssetType) => {
  const navigate = useNavigate();

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
    if (isExtension) {
      navigate(RouteName.LoadingNetwork);
    } else {
      openLoadingModal({});
    }
    const result = await addMultipleAssets(assets);

    const isSuccessful = result[0];
    const message = result[1];

    if (isSuccessful) {
      if (isExtension) {
        navigate(RouteName.Sucess, {
          state: {
            message,
          },
        });
      } else {
        openSucessModal({
          message,
          onClick: closeModalAction,
        });
      }
    } else {
      if (isExtension) {
        navigate(RouteName.Error, {
          state: {
            message,
          },
        });
      } else {
        openErrorModal({
          message,
          onClick: closeModalAction,
        });
      }
    }
  };
  const handleCancel = () => {
    navigate(RouteName.Home, {
      state: {
        alreadyLoaded: true,
      },
    });
  };
  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Search',
      content: (
        <SearchAsset
          key="searchAsset"
          onSubmit={handleSearchAssetSubmitBtn}
          onCancel={isExtension ? handleCancel : closeModalAction}
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
          onCancel={isExtension ? handleCancel : closeModalAction}
        />
      ),
    },
  ];

  return (
    <div>
      {children}

      <Tabs
        data={tabs}
        isEqualWidth
        contentStyle={{ marginTop: isExtension ? '16px' : '0' }}
      />
    </div>
  );
};
AddAsset.defaultProps = {
  children: '',
  isExtension: false,
};

export default AddAsset;
