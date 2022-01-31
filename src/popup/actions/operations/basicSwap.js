import StellarSdk from 'stellar-sdk';

import isNative from '../../utils/isNative';
import * as route from '../../staticRes/routes';
import showError from '../../utils/errorMessage';
import calculatePath from '../../utils/calculatePath';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/horizon/currentNetwork';
import pathPaymentStrictSend from '../../operations/pathPaymentStrictSend';

export default async (values, push) => {
  push(route.loadingNetworkPage);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new StellarSdk.Server(url);
  const sourceKeys = StellarSdk.Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  const params = {
    sendAsset: StellarSdk.Asset.native(),
    destAsset: StellarSdk.Asset.native(),
    path: calculatePath(values.path),
    destMin: values.minimumReceived.toFixed(6),
    sendAmount: values.from.toString(),
    destination: activeAccount.publicKey,
  };

  if (!isNative(values.asset1)) {
    params.sendAsset = new StellarSdk.Asset(
      values.asset1.asset_code,
      values.asset1.asset_issuer,
    );
  }

  if (!isNative(values.asset2)) {
    params.destAsset = new StellarSdk.Asset(
      values.asset2.asset_code,
      values.asset2.asset_issuer,
    );
  }

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: passphrase,
      })
        .addOperation(pathPaymentStrictSend(params))
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
      console.log(err);
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
