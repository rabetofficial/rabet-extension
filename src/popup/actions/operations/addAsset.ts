import StellarSdk from 'stellar-sdk';

import RouteName from '../../staticRes/routes';
import changeTrust from '../../operations/changeTrust';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/currentNetwork';

export default async ({ code, issuer, limit }, push) => {
  let limitStr;

  if (limit) {
    limitStr = limit.toString();
  }

  push(RouteName.LoadingNetwork);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(
    activeAccount.privateKey,
  );

  let transaction;

  server
    .loadAccount(issuer)
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
      })
        .addOperation(
          changeTrust({
            limit: limitStr,
            asset: new StellarSdk.Asset(code, issuer),
          }),
        )
        .setTimeout(180)
        .build();

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
