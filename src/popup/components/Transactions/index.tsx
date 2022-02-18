import React from 'react';
import { OperationsTx, TransferTx, SwapTx } from './Operations';

const Transactions = () => (
  <div>
    <TransferTx
      type="send"
      amount={12}
      asset_code="XLM"
      date="1 min ago"
    />
    <TransferTx
      type="recieve"
      amount={12}
      asset_code="XLM"
      date="1 min ago"
    />
    <SwapTx
      amount1={12}
      amount2={12}
      asset_code1="XLM"
      asset_code2="XLM"
      date="1 min ago"
    />
    <OperationsTx type="multi" date="1 min ago" />
    <OperationsTx
      type="single"
      operation_name="Manage date"
      date="1 min ago"
    />
  </div>
);
export default Transactions;
