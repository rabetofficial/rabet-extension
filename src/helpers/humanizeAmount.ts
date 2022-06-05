import numeral from 'numeral';
import BN from 'helpers/BN';

export function sevenDigit(number: number | string) {
  const [before, after] = number.toString().split('.');
  const integer = before || '0';

  if (!after) {
    return integer;
  }

  switch (before.length) {
    case 0:
      return `${integer}.${after.slice(0, 8)}`;
    case 1:
      return `${integer}.${after.slice(0, 7)}`;
    case 2:
      return `${integer}.${after.slice(0, 6)}`;
    case 3:
      return `${integer}.${after.slice(0, 5)}`;
    case 4:
      return `${integer}.${after.slice(0, 4)}`;
    case 5:
      return `${integer}.${after.slice(0, 3)}`;
    case 6:
      return `${integer}.${after.slice(0, 2)}`;
    default:
      return integer;
  }
}

export default function humanizeAmount(
  amount: number | string,
  big = false,
) {
  if (new BN(amount).isEqualTo(0)) {
    return 0;
  }
  if (new BN(amount).isLessThan('0.000001')) {
    return amount;
  }

  let format = '0,0.[0000000]';
  if (big) {
    format = '0.[00]a';
  }

  return numeral(sevenDigit(amount)).format(format);
}
