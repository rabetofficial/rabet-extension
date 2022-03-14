import {
  Server,
  Horizon,
  Keypair,
  Operation,
  AuthRequiredFlag,
  AuthRevocableFlag,
  AuthImmutableFlag,
  TransactionBuilder,
} from 'stellar-sdk';

import RouteName from 'popup/staticRes/routes';
import { NavigateFunction } from 'react-router-dom';
import currentNetwork from 'popup/utils/currentNetwork';
import currentActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

export default async (
  flags: Horizon.Flags,
  push: NavigateFunction,
) => {
  push(RouteName.LoadingNetwork);

  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  let setFlags;
  let clearFlags;

  if (flags.auth_required) {
    setFlags |= AuthRequiredFlag;
  } else {
    clearFlags |= AuthRequiredFlag;
  }

  if (flags.auth_revocable) {
    setFlags |= AuthRevocableFlag;
  } else {
    clearFlags |= AuthRevocableFlag;
  }

  if (flags.auth_immutable) {
    setFlags |= AuthImmutableFlag;
  } else {
    clearFlags |= AuthImmutableFlag;
  }

  if (flags.auth_clawback_enabled) {
    setFlags |= 8;
  } else {
    clearFlags |= 8;
  }

  const server = new Server(url);
  const sourceKeys = Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  server
    .loadAccount(sourceKeys.publicKey())
    .then((sourceAccount) => {
      transaction = new TransactionBuilder(sourceAccount, {
        fee: config.BASE_FEE,
        networkPassphrase: passphrase,
      })
        .addOperation(
          Operation.setOptions({
            setFlags,
            clearFlags,
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
          message: result.hash,
        },
      });
    })
    .catch((err) => {
      let error = err.message;

      if (err && err.response && err.response.data) {
        error = err.response.data;
      }

      push(RouteName.Error, {
        state: {
          message: error,
        },
      });
    });
};
