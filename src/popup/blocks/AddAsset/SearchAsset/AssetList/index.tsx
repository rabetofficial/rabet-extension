import React from 'react';
import ScrollBar from 'popup/components/common/ScrollBar';
import Asset from './Asset';

import { List } from './styles';

type AppProps = {
  list: any[];
  setActive: (index: number) => void;
  selectedList: any[];
};

const AssetList = ({ list, setActive, selectedList }: AppProps) => (
  <ScrollBar isHidden maxHeight={186}>
    <List>
      {list.map((item, index) => (
        <Asset
          key={item.asset_issuer ? item.asset_issuer : index}
          item={item}
          index={index}
          setActive={setActive}
          selectedList={selectedList}
        />
      ))}
    </List>
  </ScrollBar>
);

export default AssetList;
