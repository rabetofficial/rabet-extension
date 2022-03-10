import {
  Asset,
  Server,
  Keypair,
  Operation,
  TransactionBuilder,
} from 'stellar-sdk';

import showError from 'popup/staticRes/errorMessage';
import currentNetwork from 'popup/utils/currentNetwork';
import { FormValues } from 'popup/blocks/Op/Basic/Swap';
import calculatePath from 'popup/utils/swap/calculatePath';
import currentActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

const basicSendAction = async (values: FormValues) => {
  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Server(url);
  const sourceKeys = Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  const params = {
    sendAsset: Asset.native(),
    destAsset: Asset.native(),
    path: calculatePath(values.path),
    destMin: values.to,
    sendAmount: values.from.toString(),
    destination: activeAccount.publicKey,
  };

  if (
    values.asset1.asset_type === 'credit_alphanum4' ||
    values.asset1.asset_type === 'credit_alphanum12'
  ) {
    params.sendAsset = new Asset(
      values.asset1.asset_code,
      values.asset1.asset_issuer,
    );
  }

  if (
    values.asset2.asset_type === 'credit_alphanum4' ||
    values.asset2.asset_type === 'credit_alphanum12'
  ) {
    params.sendAsset = new Asset(
      values.asset2.asset_code,
      values.asset2.asset_issuer,
    );
  }

  try {
    const result = await server
      .loadAccount(sourceKeys.publicKey())
      .then((sourceAccount) => {
        transaction = new TransactionBuilder(sourceAccount, {
          fee: config.BASE_FEE,
          networkPassphrase: passphrase,
        })
          .addOperation(Operation.pathPaymentStrictSend(params))
          .setTimeout(180)
          .build();

        transaction.sign(sourceKeys);

        return server.submitTransaction(transaction);
      });

    return [true, result.hash];
  } catch (err) {
    if (err && err.response && err.response.data) {
      return [false, showError(err.response.data)];
    }

    return [false, 'Operation failed.'];
  }
};

export default basicSendAction;
