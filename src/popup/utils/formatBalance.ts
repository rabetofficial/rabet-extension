import BN from 'helpers/BN';

import formatCurrency from './formatCurrency';
import numberWithCommas from './numberWithCommas';

const formatBalance = (balance: string) =>
  numberWithCommas(
    formatCurrency(new BN(balance).toFixed(7).toString()),
  );

export default formatBalance;
