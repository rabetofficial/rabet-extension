import React from 'react';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import NoDate from 'popup/components/common/Nodata';
import Asset from './Asset';

import { Border } from './styles';

const AssetList = () => {
  const { assets } = useActiveAccount();

  if (!assets) {
    return <NoDate msg="No Assets" />;
  }

  return (
    <div>
      {assets.map((asset, index) => (
        <Border key={index}>
          <Asset asset={asset} />
        </Border>
      ))}
    </div>
  );
};

export default AssetList;
