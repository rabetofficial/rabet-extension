import StellarSdk from 'stellar-sdk';

import config from '../../../config';
import isNative from '../../utils/isNative';
import matchAsset from '../../utils/matchAsset';
import * as route from '../../staticRes/routes';
import showError from '../../utils/errorMessage';
import calculatePath from '../../utils/calculatePath';
import changeTrust from '../../operations/changeTrust';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/horizon/currentNetwork';
import pathPaymentStrictSend from '../../operations/pathPaymentStrictSend';

export default async (values, push) => {
  push(route.loadingNetworkPage);

  const { activeAccount } = currentActiveAccount();
  const { balances } = activeAccount;
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

  const foundToken = balances.find((token) => matchAsset(token, values.asset2));

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: config.BASE_FEE,
        networkPassphrase: passphrase,
      });

      if (!foundToken) {
        transaction = transaction.addOperation(changeTrust({
          limit: '999999',
          asset: params.destAsset,
        }));
      }

      transaction = transaction
        .addOperation(pathPaymentStrictSend(params));

      transaction = transaction.setTimeout(180).build();
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
