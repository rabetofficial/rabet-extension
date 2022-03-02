import { useState, useEffect } from 'react';

import useActiveAccount from 'popup/hooks/useActiveAccount';
import useTypedSelector from 'popup/hooks/useTypedSelector';

import loadBids from 'popup/features/loadBids';
import loadAccount from 'popup/features/loadAccount';
import loadCurrencies from 'popup/features/loadCurrencies';
import loadAssetImages from 'popup/features/loadAssetImages';

import config from '../../config';

const useLoadHome = () => {
  const activeAccount = useActiveAccount();
  const [isLoading, setIsLoading] = useState(true);
  const { network } = useTypedSelector((store) => store.options);

  useEffect(() => {
    loadCurrencies();

    loadAccount(activeAccount).then(() => {
      loadBids();
      loadAssetImages();

      setIsLoading(false);
    });

    const intervalId = setInterval(() => {
      loadCurrencies();

      loadAccount(activeAccount).then(() => {
        loadBids();
        loadAssetImages();

        setIsLoading(false);
      });
    }, config.INTERVAL_TIME_SECONDS * 1000);

    return () => clearInterval(intervalId);
  }, [activeAccount.publicKey, network]);

  return isLoading;
};

export default useLoadHome;
