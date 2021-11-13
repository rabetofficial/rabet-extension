const getTotalBalance = (balances = [], activeCurrency) => {
  const totalBalance = balances.reduce((sum, item) => {
    const isNative = item.asset_type === 'native';

    let temp;

    if (isNative) {
      temp = Number.parseFloat(item.balance, 10) * activeCurrency.value;
    } else {
      if (!item.toNative) {
        temp = 0;
      } else {
        temp = (1 / Number.parseFloat(item.toNative, 10))
        * activeCurrency.value * Number.parseFloat(item.balance, 10);
      }
    }

    return sum + temp;
  }, 0);

  return totalBalance;
};

export default getTotalBalance;
