import StellarSdk from 'stellar-sdk';

import isNative from '../../utils/isNative';
import * as route from '../../staticRes/routes';
import payment from '../../operations/payment';
import showError from '../../utils/errorMessage';
import createAccount from '../../operations/createAccount';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/currentNetwork';

export default async (values, push) => {
  push(route.loadingNetworkPage);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(
    activeAccount.privateKey,
  );

  let transaction;

  let op;

  if (values.isAccountNew) {
    op = createAccount({
      startingBalance: values.amount,
      destination: values.destination,
    });
  } else {
    const isAssetNative = isNative(values.asset);
    let asset;

    if (isAssetNative) {
      asset = StellarSdk.Asset.native();
    } else {
      asset = new StellarSdk.Asset(
        values.asset.asset_code,
        values.asset.asset_issuer,
      );
    }

    op = payment({
      asset,
      amount: values.amount,
      destination: values.destination,
    });
  }

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      })
        .addOperation(op)
        .setTimeout(180)
        .build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then((result) => {
      push(route.successSubmitPage, {
        state: {
          hash: result.hash,
        },
      });
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        push(route.errorPage, {
          state: {
            message: showError(err.response.data),
          },
        });
      } else {
        push(route.errorPage, {
          state: {
            message: 'Operation failed.',
          },
        });
      }
    });
};
