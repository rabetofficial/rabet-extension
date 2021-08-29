const getTotalBalance = (balances, activeCurrency) => {
  const totalBalance = balances.reduce((sum, item) => {
    const nextValue = item.asset_type === 'native'
      ? Number.parseFloat(item.balance, 10) * activeCurrency.value
      : (1 / Number.parseFloat(item.toNative, 10))
      * activeCurrency.value * Number.parseFloat(item.balance, 10) || 0;

    return sum + nextValue;
  }, 0);

  return totalBalance;
};

export default getTotalBalance;
