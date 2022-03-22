import formatCurrency from './formatCurrency';
import numberWithCommas from './numberWithCommas';

const formatBalance = (balance: string) =>
  numberWithCommas(formatCurrency(balance));

export default formatBalance;
