import React from 'react';
import { Horizon } from 'stellar-sdk';

import Assets from 'popup/pageComponents/Assets';
import PageTitle from 'popup/components/PageTitle';
import NoDate from 'popup/components/common/Nodata';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import handleAssetsKeys from 'popup/utils/handleAssetKeys';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import {
  openErrorModal,
  openSucessModal,
} from 'popup/components/Modals';

import Asset from './Asset';
import { Border } from './styles';

const AssetList = () => {
  const { assets: asts } = useActiveAccount();
  const assets = asts || [];

  const openAssetInfoModal = (asset: Horizon.BalanceLine) => {
    const showDeleteResult = (result: any[]) => {
      if (result[0]) {
        openSucessModal({
          message: result[1],
          onClick: closeModalAction,
        });
      } else {
        openErrorModal({
          message: result[1],
          onClick: closeModalAction,
        });
      }
    };

    if (asset.asset_type === 'native') {
      openModalAction({
        isStyled: false,
        title: 'Asset info',
        size: 'medium',
        padding: 'medium',
        minHeight: 597,
        children: (
          <Assets
            asset={asset}
            isNative
            onCancel={closeModalAction}
            onDelete={showDeleteResult}
          >
            <PageTitle
              title="Asset | XLM"
              padding="0"
              onClose={closeModalAction}
            />
          </Assets>
        ),
      });
    } else {
      openModalAction({
        isStyled: false,
        title: 'Asset info',
        size: 'medium',
        padding: 'medium',
        minHeight: 597,
        children: (
          <Assets
            asset={asset}
            onCancel={closeModalAction}
            onDelete={showDeleteResult}
          >
            <PageTitle
              title="Asset info"
              padding="0"
              onClose={closeModalAction}
            />
          </Assets>
        ),
      });
    }
  };

  if (!assets.length) {
    return <NoDate msg="No Assets" />;
  }

  return (
    <ScrollBar isHidden maxHeight={320}>
      {assets.map((asset) => (
        <Border
          key={`assetList${handleAssetsKeys(asset)}`}
          onClick={() => {
            openAssetInfoModal(asset);
          }}
        >
          <Asset asset={asset} />
        </Border>
      ))}
    </ScrollBar>
  );
};

export default AssetList;
