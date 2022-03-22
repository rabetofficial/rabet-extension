import BN from 'helpers/BN';

const formatCurrency = (b: string): string => {
  const balance = parseFloat(b).toString();
  const balanceNumber = new BN(balance);

  if (balanceNumber.isNaN() || balanceNumber.isNegative()) {
    return '0';
  }

  if (
    balanceNumber.isGreaterThanOrEqualTo(0) &&
    balanceNumber.isLessThanOrEqualTo(1)
  ) {
    return new BN(balance).toString();
  }

  if (balanceNumber.isEqualTo(0)) {
    return '0';
  }

  const [int, decimal] = balance.split('.');

  if (!decimal) {
    return int;
  }

  const integer = int || '0';

  if (new BN(decimal || '0').isEqualTo(0)) {
    return integer;
  }

  switch (int.length) {
    case 0:
      return `${integer}.${decimal.slice(0, 7)}`;
    case 1:
      return `${integer}.${decimal.slice(0, 6)}`;
    case 2:
      return `${integer}.${decimal.slice(0, 5)}`;
    case 3:
      return `${integer}.${decimal.slice(0, 4)}`;
    case 4:
      return `${integer}.${decimal.slice(0, 3)}`;
    case 5:
      return `${integer}.${decimal.slice(0, 2)}`;
    default:
      return `${integer}`;
  }
};

export default formatCurrency;
