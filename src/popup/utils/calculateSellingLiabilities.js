const calculateSellingLiabilities = (balances) => {
  const sum = balances.reduce((s, balance) => {
    if (balance.selling_liabilities) {
      return s + parseFloat(balance.selling_liabilities, 10);
    }

    return s;
  }, 0);

  return sum;
};

export default calculateSellingLiabilities;
