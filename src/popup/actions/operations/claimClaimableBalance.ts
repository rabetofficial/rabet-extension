import {
  Asset,
  Server,
  Keypair,
  TransactionBuilder,
  Operation,
} from 'stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';
import getActiveAccount from 'popup/utils/activeAccount';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';

import config from '../../../config';

export default async (
  claimableData: ClaimableBalanceWithAssetImage,
) => {
  const { activeAccount: account } = getActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Server(url);
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
        Operation.claimClaimableBalance({
          balanceId: claimableData.id,
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
