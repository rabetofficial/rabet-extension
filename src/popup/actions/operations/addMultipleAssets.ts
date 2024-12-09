import {
  Asset,
  Horizon,
  Keypair,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import currentNetwork from 'popup/utils/currentNetwork';
import currentActiveAccount from 'popup/utils/activeAccount';
import { AssetImageWithActive } from 'popup/reducers/assetImages';

import config from '../../../config';

type addMultipleAssetsResult = [boolean, string];

const addMultipleAssets = async (
  assets: AssetImageWithActive[],
): Promise<addMultipleAssetsResult> => {
  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Horizon.Server(url);
  const sourceKeys = Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  try {
    const result = await server
      .loadAccount(sourceKeys.publicKey())
      .then((sourceAccount) => {
        transaction = new TransactionBuilder(sourceAccount, {
          fee: config.BASE_FEE,
          networkPassphrase: passphrase,
        });

        for (let i = 0; i < assets.length; i += 1) {
          transaction = transaction.addOperation(
            Operation.changeTrust({
              asset: new Asset(
                assets[i].asset_code,
                assets[i].asset_issuer,
              ),
            }),
          );
        }

        transaction = transaction.setTimeout(180).build();

        transaction.sign(sourceKeys);

        return server.submitTransaction(transaction);
      });

    return [true, result.hash];
  } catch (err: any) {
    return [false, err.message];
  }
};

export default addMultipleAssets;
