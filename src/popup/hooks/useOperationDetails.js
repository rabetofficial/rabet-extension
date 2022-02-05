import SendLogo from '../../assets/images/tx/send.png';
import SwapLogo from '../../assets/images/tx/swap.png';
import MultiLogo from '../../assets/images/tx/multi.png';
import OtherLogo from '../../assets/images/tx/other.png';
import ReceiveLogo from '../../assets/images/tx/receive.png';

import capital from '../utils/capital';
import formatCurrency from '../utils/formatCurrency';
import numberWithCommas from '../utils/numberWithCommas';

const useOperationDetails = (operation, operation_count, activeAccount) => {
  if (operation_count > 1) {
    return [MultiLogo, 15, 'Multi operations'];
  }

  if (operation.type === 'path_payment_strict_send') {
    return [
      SwapLogo,
      15,
      `Swap ${numberWithCommas(formatCurrency(operation.source_amount))} ${operation.source_asset_code || 'XLM'} -> ${numberWithCommas(formatCurrency(operation.amount))} ${
        operation.asset_code || 'XLM'
      }`,
    ];
  }

  if (operation.type === 'create_account') {
    return [
      SendLogo,
      12,
      `Send ${numberWithCommas(formatCurrency(operation.starting_balance))} XLM`,
    ];
  }

  if (
    operation.type === 'payment' &&
    operation.from === activeAccount.publicKey
  ) {
    return [
      SendLogo,
      12,
      `Send ${numberWithCommas(formatCurrency(operation.amount))} ${
        operation.asset_code || 'XLM'
      }`,
    ];
  }

  if (
    operation.type === 'payment' &&
    operation.from !== activeAccount.publicKey
  ) {
    return [
      ReceiveLogo,
      12,
      `Receive ${numberWithCommas(formatCurrency(operation.amount))} ${
        operation.asset_code || 'XLM'
      }`,
    ];
  }

  const operationName = operation.type.split('_').map(capital).join(' ');

  return [OtherLogo, 7, operationName];
};

export default useOperationDetails;
