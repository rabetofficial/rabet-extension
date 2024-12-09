import {
  Memo,
  Asset,
  Horizon,
  Keypair,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import { SendValues } from 'popup/models';
import showError from 'popup/staticRes/errorMessage';
import currentNetwork from 'popup/utils/currentNetwork';
import currentActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

export default async (values: SendValues) => {
  const { activeAccount: account } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Horizon.Server(url);
  const sourceKeys = Keypair.fromSecret(account.privateKey);

  let transaction;

  let op = Operation.createAccount({
    startingBalance: values.amount,
    destination: values.destination,
  });

  if (!values.isAccountNew) {
    let asset;

    if (values.asset.asset_type === 'native') {
      asset = Asset.native();
    } else if (values.asset.asset_type === 'liquidity_pool_shares') {
      asset = Asset.native();
    } else {
      asset = new Asset(
        values.asset.asset_code,
        values.asset.asset_issuer,
      );
    }

    op = Operation.payment({
      asset,
      amount: values.amount,
      destination: values.destination,
    });
  }

  try {
    const transactionResult = await server
      .loadAccount(sourceKeys.publicKey())
      .then((sourceAccount) => {
        transaction = new TransactionBuilder(sourceAccount, {
          fee: config.BASE_FEE,
          networkPassphrase: passphrase,
        }).addOperation(op);

        if (values.memo) {
          transaction = transaction.addMemo(Memo.text(values.memo));
        }

        transaction = transaction.setTimeout(180).build();
        transaction.sign(sourceKeys);

        return server.submitTransaction(transaction);
      });

    return [true, transactionResult.hash];
  } catch (err: any) {
    if (err && err.response && err.response.data) {
      return [false, showError(err.response.data)];
    }

    return [false, 'Operation failed'];
  }
};
