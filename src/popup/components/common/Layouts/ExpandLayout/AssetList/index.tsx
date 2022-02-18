import React from 'react';

import NoDate from 'popup/components/common/Nodata';
import handleAssetsKeys from 'popup/utils/handleAssetKeys';
import useActiveAccount from 'popup/hooks/useActiveAccount';
import Asset from './Asset';

import { Border } from './styles';

const AssetList = () => {
  const { assets } = useActiveAccount();

  if (!assets) {
    return <NoDate msg="No Assets" />;
  }

  return (
    <div>
      {assets.map((asset) => (
        <Border key={`assetList${handleAssetsKeys(asset)}`}>
          <Asset asset={asset} />
        </Border>
      ))}
    </div>
  );
};

export default AssetList;
