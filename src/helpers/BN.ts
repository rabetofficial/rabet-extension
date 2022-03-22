import BigNumber from 'bignumber.js';

const BN = BigNumber.clone({
  DECIMAL_PLACES: 8,
  EXPONENTIAL_AT: 1e9,
});

export default BN;
