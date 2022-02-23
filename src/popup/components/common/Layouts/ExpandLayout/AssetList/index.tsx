import React from 'react';
import { Horizon } from 'stellar-sdk';

import Assets from 'popup/pageComponents/Assets';
import NoDate from 'popup/components/common/Nodata';
import openModalAction from 'popup/actions/modal/open';
import closeModalAction from 'popup/actions/modal/close';
import ScrollBar from 'popup/components/common/ScrollBar';
import handleAssetsKeys from 'popup/utils/handleAssetKeys';
import useActiveAccount from 'popup/hooks/useActiveAccount';

import Asset from './Asset';
import { Border } from './styles';

const AssetList = () => {
  const { assets } = useActiveAccount();

  const openAssetInfoModal = (asset: Horizon.BalanceLine) => {
    openModalAction({
      isStyled: true,
      title: 'Create Wallet',
      size: 'medium',
      padding: 'large',
      minHeight: 0,
      children: (
        <Assets
          asset={asset}
          onClick={() => {
            console.log('hio');
          }}
          onCancel={closeModalAction}
        />
      ),
    });
  };

  if (!assets) {
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
