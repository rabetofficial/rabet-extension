import { useState, useEffect } from 'react';

import BN from 'helpers/BN';
import { IAccount } from 'popup/reducers/accounts2';
import loadAssetBalance from 'popup/features/loadAssetBalance';

import useActiveAccount from './useActiveAccount';
import useTypedSelector from './useTypedSelector';
import useActiveCurrency from './useActiveCurrency';

const useTotalBalance = (acc: IAccount) => {
  const activeAccount = useActiveAccount();
  const [options, bids] = useTypedSelector((store) => [
    store.options,
    store.bids,
  ]);
  const [totalBalance, setTotalBalance] = useState('0');
  const activeCurrency = useActiveCurrency();
  const currencyPrice = new BN(activeCurrency?.price || 0);

  const account = acc || activeAccount;

  useEffect(() => {
    const assets = account.assets || [];

    let totalBalanceTemp = new BN(0);

    for (let i = 0; i < assets.length; i += 1) {
      const assetPrice = loadAssetBalance({
        asset: assets[i],
        currencyPrice,
        bids,
      });

      totalBalanceTemp = totalBalanceTemp.plus(assetPrice);
    }

    setTotalBalance(totalBalanceTemp.toString());
  }, [account, options, bids, activeCurrency]);

  return totalBalance;
};

export default useTotalBalance;
