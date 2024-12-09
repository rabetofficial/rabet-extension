import {
  Asset,
  Keypair,
  TransactionBuilder,
  Operation,
  Horizon,
} from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';
import getActiveAccount from 'popup/utils/activeAccount';
import { ClaimableBalanceWithAssetImage } from 'popup/api/getClaimableBalances';

import config from '../../../config';

export default async (
  claimableData: ClaimableBalanceWithAssetImage,
) => {
  const { activeAccount: account } = getActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Horizon.Server(url);
  const sourceKeys = Keypair.fromSecret(account.privateKey);

  let isAssetTrusted = true;

  const [code, issuer] = claimableData.asset.split(':');

  if (claimableData.asset !== 'native') {
    const foundAsset = account.assets.find(
      (ast) => ast.asset_code === code && ast.asset_issuer === issuer,
    );

    if (!foundAsset) {
      isAssetTrusted = false;
    }
  }

  try {
    const sourceAccount = await server.loadAccount(
      sourceKeys.publicKey(),
    );

    let transaction = new TransactionBuilder(sourceAccount, {
      fee: config.BASE_FEE,
      networkPassphrase: passphrase,
    });

    if (!isAssetTrusted) {
      transaction = transaction.addOperation(
        Operation.changeTrust({
          limit: '922337203685',
          asset: new Asset(code, issuer),
        }),
      );
    }

    transaction = transaction.addOperation(
      Operation.claimClaimableBalance({
        balanceId: claimableData.id,
      }),
    );

    transaction = transaction.setTimeout(180).build();

    transaction.sign(sourceKeys);

    const result = await server.submitTransaction(transaction);

    return [true, result.hash];
  } catch (err: any) {
    return [false, err.message];
  }
};
