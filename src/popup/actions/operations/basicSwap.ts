import {
  Asset,
  Horizon,
  Keypair,
  Operation,
  TransactionBuilder,
} from '@stellar/stellar-sdk';

import matchAsset from 'popup/utils/matchAsset';
import showError from 'popup/staticRes/errorMessage';
import currentNetwork from 'popup/utils/currentNetwork';
import { FormValues } from 'popup/blocks/Op/Basic/Swap';
import calculatePath from 'popup/utils/swap/calculatePath';
import currentActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

const basicSendAction = async (values: FormValues) => {
  const { activeAccount } = currentActiveAccount();
  const { url, passphrase } = currentNetwork();

  const assets = activeAccount.assets || [];

  const server = new Horizon.Server(url);
  const sourceKeys = Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  const params = {
    sendAsset: Asset.native(),
    destAsset: Asset.native(),
    path: calculatePath(values.path),
    destMin: values.minimumReceived.toFixed(5),
    sendAmount: values.from.toString(),
    destination: activeAccount.publicKey,
  };

  if (values.asset1.asset_type !== 'native') {
    params.sendAsset = new Asset(
      values.asset1.asset_code,
      values.asset1.asset_issuer,
    );
  }

  if (values.asset2.asset_type !== 'native') {
    params.destAsset = new Asset(
      values.asset2.asset_code,
      values.asset2.asset_issuer,
    );
  }

  const foundAsset = assets.find((ast) =>
    matchAsset(ast, values.asset2),
  );

  try {
    const result = await server
      .loadAccount(sourceKeys.publicKey())
      .then((sourceAccount) => {
        transaction = new TransactionBuilder(sourceAccount, {
          fee: config.BASE_FEE,
          networkPassphrase: passphrase,
        });

        if (!foundAsset) {
          transaction = transaction.addOperation(
            Operation.changeTrust({
              limit: '999999',
              asset: params.destAsset,
            }),
          );
        }

        transaction = transaction.addOperation(
          Operation.pathPaymentStrictSend(params),
        );

        transaction = transaction.setTimeout(180).build();

        transaction.sign(sourceKeys);

        return server.submitTransaction(transaction);
      });

    return [true, result.hash];
  } catch (err: any) {
    if (err && err.response && err.response.data) {
      return [false, showError(err.response.data)];
    }

    return [false, 'Operation failed.'];
  }
};

export default basicSendAction;
