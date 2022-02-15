import React from 'react';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import Asset from './Asset';

import { Border } from './styles';

const AssetList = () => {
  const { balances } = useActiveAccount();

  if (!balances) {
    return <p>no assets</p>;
  }

  return (
    <div>
      {balances.map((balance, index) => (
        <Border key={index}>
          <Asset balance={balance} />
        </Border>
      ))}
    </div>
  );
};

export default AssetList;
