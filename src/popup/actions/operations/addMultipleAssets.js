import StellarSdk from 'stellar-sdk';

import * as route from '../../staticRes/routes';
import changeTrust from '../../operations/changeTrust';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/horizon/currentNetwork';

export default async (assets, push) => {
  push(route.loadingNetworkPage);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  server
    .loadAccount(assets[0].asset_issuer)
    .catch(() => {
      push({
        pathname: route.errorPage,
        state: { message: 'ERROR. The issuer account does not exist.' },
      });
    })
    .then(() => server.loadAccount(sourceKeys.publicKey()))
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      });

      for (let i = 0; i < assets.length; i += 1) {
        transaction = transaction.addOperation(changeTrust({
          asset: new StellarSdk.Asset(assets[i].asset_code, assets[i].asset_issuer),
        }));
      }

      transaction = transaction
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then((result) => {
      push({
        pathname: route.successSubmitPage,
        state: { hash: result.hash },
      });
    })
    .catch((err) => {
      push({
        pathname: route.errorPage,
        state: { message: err.message },
      });
    });
};
