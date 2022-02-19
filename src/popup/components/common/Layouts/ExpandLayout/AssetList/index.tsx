import React from 'react';

import NoDate from 'popup/components/common/Nodata';
import handleAssetsKeys from 'popup/utils/handleAssetKeys';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import ScrollBar from 'popup/components/common/ScrollBar';
import Asset from './Asset';

import { Border } from './styles';

const AssetList = () => {
  const { assets } = useActiveAccount();

  if (!assets) {
    return <NoDate msg="No Assets" />;
  }

  return (
    <ScrollBar isHidden maxHeight={320}>
      {assets.map((asset) => (
        <Border key={`assetList${handleAssetsKeys(asset)}`}>
          <Asset asset={asset} />
        </Border>
      ))}
    </ScrollBar>
  );
};

export default AssetList;
