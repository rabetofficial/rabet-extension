import StellarSdk from 'stellar-sdk';

import * as route from '../../staticRes/routes';
import changeTrust from '../../operations/changeTrust';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/horizon/currentNetwork';

export default async ({ code, issuer, limit }, push) => {
  let limitStr;

  if (limit) {
    limitStr = limit.toString();
  }

  push(route.loadingNetworkPage);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  server
    .loadAccount(issuer)
    .catch(() => {
      push(
        route.errorPage,
        { message: 'ERROR. The issuer account does not exist.' },
      );
    })
    .then(() => server.loadAccount(sourceKeys.publicKey()))
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      })
        .addOperation(changeTrust({
          limit: limitStr,
          asset: new StellarSdk.Asset(code, issuer),
        }))
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then((result) => {
      push(
        route.successSubmitPage,
        { hash: result.hash },
      );
    })
    .catch((err) => {
      push(
        route.errorPage,
        { message: err.message },
      );
    });
};
