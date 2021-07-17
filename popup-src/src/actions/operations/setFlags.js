import StellarSdk from 'stellar-sdk';

import * as route from 'Root/staticRes/routes';
import currentActiveAccount from 'Root/helpers/activeAccount';
import currentNetwork from 'Root/helpers/horizon/currentNetwork';

export default async ({ auth_required, auth_revocable, auth_immutable, auth_clawback_enabled }, push) => {
  push(route.loadingNetworkPage);

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

  if (auth_clawback_enabled) {
    // setFlags |= StellarSdk.AuthClawbackEnabledFlag;
    setFlags |= 8;
  } else {
    // clearFlags |= StellarSdk.AuthClawbackEnabledFlag;
    clearFlags |= 8;
  }

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  console.log(StellarSdk.AuthImmutableFlag, StellarSdk.AuthRevocableFlag, StellarSdk.AuthClawbackEnabledFlag)

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
