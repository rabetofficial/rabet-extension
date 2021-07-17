import currencySymbols from 'Root/staticRes/currencySymbols';

export default (balance, c) => {
  const currency = c.toUpperCase();

  return `${currencySymbols[currency]} ${balance}`;
}