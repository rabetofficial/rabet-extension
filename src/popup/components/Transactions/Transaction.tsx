import React from 'react';
import { ServerApi, Horizon } from 'stellar-sdk';

import { OperationsTx, TransferTx, SwapTx } from './Operations';

type TransactionType = {
  publicKey: string;
  transaction: ServerApi.CollectionPage<ServerApi.OperationRecord>;
};

const Transaction = ({ transaction, publicKey }: TransactionType) => {
  const op = transaction.records[0];
  const date = op.created_at;

  if (transaction.records.length > 1) {
    return (
      <OperationsTx
        tx={op.transaction_hash}
        type="multi"
        date={date}
      />
    );
  }

  if (op.type === Horizon.OperationResponseType.pathPayment) {
    return (
      <SwapTx
        tx={op.transaction_hash}
        amount1={op.source_amount}
        amount2={op.amount}
        asset_code1={op.source_asset_code || 'XLM'}
        asset_code2={op.asset_code || 'XLM'}
        date={date}
      />
    );
  }

  if (
    op.type === Horizon.OperationResponseType.createAccount &&
    op.funder === publicKey
  ) {
    return (
      <TransferTx
        tx={op.transaction_hash}
        type="send"
        amount={op.starting_balance}
        asset_code="XLM"
        date={date}
      />
    );
  }

  if (
    op.type === Horizon.OperationResponseType.createAccount &&
    op.funder !== publicKey
  ) {
    return (
      <TransferTx
        tx={op.transaction_hash}
        type="receive"
        amount={op.starting_balance}
        asset_code="XLM"
        date={date}
      />
    );
  }

  if (
    op.type === Horizon.OperationResponseType.payment &&
    op.from === publicKey
  ) {
    return (
      <TransferTx
        tx={op.transaction_hash}
        type="send"
        amount={op.amount}
        asset_code={op.asset_code || 'XLM'}
        date={date}
      />
    );
  }

  if (
    op.type === Horizon.OperationResponseType.payment &&
    op.from !== publicKey
  ) {
    return (
      <TransferTx
        tx={op.transaction_hash}
        type="receive"
        amount={op.amount}
        asset_code={op.asset_code || 'XLM'}
        date={date}
      />
    );
  }

  return (
    <OperationsTx
      tx={op.transaction_hash}
      type="single"
      operation_name={op.type.split('_').join(' ')}
      date={date}
    />
  );
};

export default Transaction;
