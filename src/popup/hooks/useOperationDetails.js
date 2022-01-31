import SendLogo from '../../assets/images/tx/send.png';
import SwapLogo from '../../assets/images/tx/swap.png';
import MultiLogo from '../../assets/images/tx/multi.png';
import OtherLogo from '../../assets/images/tx/other.png';
import ReceiveLogo from '../../assets/images/tx/receive.png';

import formatCurrency from '../utils/formatCurrency';

import useActiveAcconut from './useActiveAccount';

const useOperationDetails = (operation, operation_count) => {
  const activeAccount = useActiveAcconut();

  if (operation_count > 1) {
    return [MultiLogo, 15, 'Multi operations'];
  }

  if (operation.type === 'path_payment_strict_send') {
    return [
      SwapLogo,
      15,
      `Swap ${formatCurrency(operation.amount)} ${
        operation.asset_code || 'XLM'
      } -> ${formatCurrency(operation.source_amount)} ${
        operation.source_asset_code
      }`,
    ];
  }

  if (operation.type === 'create_account') {
    return [
      SendLogo,
      12,
      `Send ${formatCurrency(operation.starting_balance)} XLM`,
    ];
  }

  if (
    operation.type === 'payment' &&
    operation.from === activeAccount.publicKey
  ) {
    return [
      SendLogo,
      12,
      `Send ${formatCurrency(operation.amount)} ${
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
      `Receive ${formatCurrency(operation.amount)} ${
        operation.asset_code || 'XLM'
      }`,
    ];
  }

  return [OtherLogo, 7, operation.type.split('_').join(' ')];
};

export default useOperationDetails;
