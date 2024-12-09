import BN from 'helpers/BN';

const numberWithCommas = (n: string | number) => {
  let num = n;

  if (typeof n === 'number') {
    num = new BN(n).toString();
  }

  // @ts-ignore
  let parts = num.split('.');

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return parts.join('.');
};

export default numberWithCommas;
