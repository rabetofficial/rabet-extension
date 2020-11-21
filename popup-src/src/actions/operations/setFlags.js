import StellarSdk from 'stellar-sdk';

import store from 'Root/store';
import * as route from 'Root/staticRes/routes';
import currentActiveAccount from 'Root/helpers/activeAccount';
import currentNetwork from 'Root/helpers/horizon/currentNetwork';

export default async ({ auth_required, auth_revocable, auth_immutable }, push) => {
  push(route.loadingOnePage);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  let setFlags, clearFlags;

  if (auth_required) {
    setFlags |= StellarSdk.AuthRequiredFlag;
  } else {
    clearFlags |= StellarSdk.AuthRequiredFlag;
  }

  if (auth_revocable) {
    setFlags |= StellarSdk.AuthRevocableFlag;
  } else {
    clearFlags |= StellarSdk.AuthRevocableFlag;
  }

  if (auth_immutable) {
    setFlags |= StellarSdk.AuthImmutableFlag;
  } else {
    clearFlags |= StellarSdk.AuthImmutableFlag;
  }

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      })
        .addOperation(StellarSdk.Operation.setOptions({
          setFlags,
          clearFlags,
        }))
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
