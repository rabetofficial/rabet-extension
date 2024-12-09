import {
  Asset,
  Horizon,
  Keypair,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';
import getActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

export default async (
  code: string,
  issuer: string,
  limit?: string,
) => {
  const { activeAccount: account } = getActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Horizon.Server(url);
  const sourceKeys = Keypair.fromSecret(account.privateKey);

  try {
    const sourceAccount = await server.loadAccount(
      sourceKeys.publicKey(),
    );

    const transaction = new TransactionBuilder(sourceAccount, {
      fee: config.BASE_FEE,
      networkPassphrase: passphrase,
    })
      .addOperation(
        Operation.changeTrust({
          limit,
          asset: new Asset(code, issuer),
        }),
      )
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);
    const result = await server.submitTransaction(transaction);

    return [true, result.hash];
  } catch (err: any) {
    return [false, err.message];
  }
};
