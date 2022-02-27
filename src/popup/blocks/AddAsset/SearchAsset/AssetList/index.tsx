import React from 'react';

import ScrollBar from 'popup/components/common/ScrollBar';

import Asset from './Asset';
import { List } from './styles';
import { AssetImageWithActive } from '../index';

type AppProps = {
  list: AssetImageWithActive[];
  setActive: (index: number) => void;
  selectedList: AssetImageWithActive[];
};

const AssetList = ({ list, setActive, selectedList }: AppProps) => (
  <ScrollBar isHidden maxHeight={186}>
    <List>
      {list.map((asset, index) => (
        <Asset
          asset={asset}
          index={index}
          setActive={setActive}
          selectedList={selectedList}
          key={`searchAsset${asset.asset_code}${asset.asset_issuer}`}
        />
      ))}
    </List>
  </ScrollBar>
);

export default AssetList;
