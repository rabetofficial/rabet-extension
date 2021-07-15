export default (balance, c) => {
  const currency = c.toUpperCase();

  if (currency === 'USD') {
    return `$${balance}`;
  }

  return `${balance} ${currency}`;
}