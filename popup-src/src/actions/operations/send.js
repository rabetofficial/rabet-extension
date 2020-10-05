import StellarSdk from 'stellar-sdk';

import store from 'Root/store';
import payment from 'Root/operations/payment';
import * as route from 'Root/staticRes/routes';
import codeToIssuer from 'Root/helpers/codeToIssuer';
import createAccount from 'Root/operations/createAccount';
import * as operationsName from 'Root/staticRes/operations';
import currentActiveAccount from 'Root/helpers/activeAccount';
import currentNetwork from 'Root/helpers/horizon/currentNetwork';

export default async (push) => {
  push(route.loadingOnePage);

  const { operations } = store.getState();

  if (!operations.length) {
    // ERROR! NO OPERATION FOUND
    return;
  }

  for (let i = 0; i < operations.length; i++) {
    if (!operations[i].checked) {
      // ERROR! Fix invalid parameters and try again.
      return;
    }
  }

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      });

      for (let i = 0; i < operations.length; i++) {
        if (operations[i].type === operationsName.payment) {
          let { asset } = operations[i];

          if (operations[i].isAccountNew) {
            transaction = transaction.addOperation(createAccount({
              startingBalance: operations[i].amount,
              destination: operations[i].destination,
            }));
          } else {
            if (asset === 'XLM') {
              asset = StellarSdk.Asset.native();
            } else {
              asset = new StellarSdk.Asset(asset, codeToIssuer(asset));
            }

            transaction = transaction.addOperation(payment({
              asset,
              amount: operations[i].amount,
              destination: operations[i].destination,
            }));
          }
        }
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
      console.log(err);
      push({
        pathname: route.errorPage,
        state: { message: 'ERROR! Please try again.' },
      });
    });

  console.log(operations);
};
