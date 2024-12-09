import { Horizon } from '@stellar/stellar-sdk';

import BN from 'helpers/BN';
import loadAssetBalance from 'popup/features/loadAssetBalance';

import useTypedSelector from './useTypedSelector';
import useActiveCurrency from './useActiveCurrency';

const useAssetPrice = (asset: Horizon.HorizonApi.BalanceLine) => {
  const activeCurrency = useActiveCurrency();
  const bids = useTypedSelector((store) => store.bids);

  const currencyPrice = new BN(activeCurrency?.price || 0);

  return loadAssetBalance({
    asset,
    currencyPrice,
    bids,
  }).toString();
};

export default useAssetPrice;
