import StellarSdk from 'stellar-sdk';

import RouteName from 'popup/staticRes/routes';
import changeTrust from 'popup/operations/changeTrust';
import currentActiveAccount from 'popup/utils/activeAccount';
import currentNetwork from 'popup/utils/currentNetwork';

export default async (assets, push) => {
  push(RouteName.LoadingNetwork);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(
    activeAccount.privateKey,
  );

  let transaction;

  server
    .loadAccount(assets[0].asset_issuer)
    .catch(() => {
      push(RouteName.Error, {
        state: {
          message: 'ERROR. The issuer account does not exist.',
        },
      });
    })
    .then(() => server.loadAccount(sourceKeys.publicKey()))
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      });

      for (let i = 0; i < assets.length; i += 1) {
        transaction = transaction.addOperation(
          changeTrust({
            asset: new StellarSdk.Asset(
              assets[i].asset_code,
              assets[i].asset_issuer,
            ),
          }),
        );
      }

      transaction = transaction.setTimeout(180).build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then((result) => {
      push(RouteName.Sucess, {
        state: {
          hash: result.hash,
        },
      });
    })
    .catch((err) => {
      push(RouteName.Error, {
        state: {
          message: err.message,
        },
      });
    });
};
