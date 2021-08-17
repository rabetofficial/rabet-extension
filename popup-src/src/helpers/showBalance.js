import * as currencies from '../staticRes/currencies';

export default (balance, c) => {
  let currency = 'USD';

  if (c) {
    currency = c.toUpperCase();
  }

  return `${currencies[currency].symbol} ${balance}`;
};
