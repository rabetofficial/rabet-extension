import { useState, useEffect } from 'react';

import { CurrencyField } from 'popup/reducers/currencies';

import useTypedSelector from './useTypedSelector';

const useActiveCurrency = () => {
  const [currencies, options] = useTypedSelector((store) => [
    store.currencies,
    store.options,
  ]);

  const defaultCurrency = {
    name: 'United States Dollar',
    title: 'USD',
    symbol: '$',
    price: 0,
  };

  const [activeCurrency, setActiveCurrency] = useState<CurrencyField>(
    currencies[options.currency] || defaultCurrency,
  );

  useEffect(() => {
    const currentCurrency = currencies[options.currency];

    if (currentCurrency) {
      setActiveCurrency(currentCurrency);
    } else {
      setActiveCurrency(defaultCurrency);
    }
  }, [options.currency]);

  return activeCurrency;
};

export default useActiveCurrency;
