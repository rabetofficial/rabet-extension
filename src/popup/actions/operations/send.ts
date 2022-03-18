import {
  Memo,
  Asset,
  Server,
  Keypair,
  Horizon,
  Operation,
  TransactionBuilder,
} from 'stellar-sdk';

import store from 'popup/store';
import showError from 'popup/staticRes/errorMessage';
import currentNetwork from 'popup/utils/currentNetwork';
import getActiveAccount from 'popup/utils/activeAccount';

import config from '../../../config';

const operationsName = Horizon.OperationResponseType;

export default async () => {
  const { operations, memo } = store.getState().transaction;

  const { activeAccount } = getActiveAccount();
  const { url, passphrase } = currentNetwork();

  const server = new Server(url);
  const sourceKeys = Keypair.fromSecret(activeAccount.privateKey);

  let transaction;

  try {
    const result = await server
      .loadAccount(sourceKeys.publicKey())
      .then((sourceAccount) => {
        transaction = new TransactionBuilder(sourceAccount, {
          fee: config.BASE_FEE,
          networkPassphrase: passphrase,
        });

        for (let i = 0; i < operations.length; i += 1) {
          if (operations[i].type === operationsName.payment) {
            const { asset } = operations[i];
            let stellarAsset;

            if (operations[i].isAccountNew) {
              transaction = transaction.addOperation(
                Operation.createAccount({
                  startingBalance: operations[i].amount,
                  destination: operations[i].destination,
                }),
              );
            } else {
              if (asset.asset_type === 'native') {
                stellarAsset = Asset.native();
              } else {
                stellarAsset = new Asset(
                  asset.asset_code,
                  asset.asset_issuer,
                );
              }

              transaction = transaction.addOperation(
                Operation.payment({
                  asset: stellarAsset,
                  amount: operations[i].amount,
                  destination: operations[i].destination,
                }),
              );
            }
          } else if (
            operations[i].type === operationsName.bumpSequence
          ) {
            transaction = transaction.addOperation(
              Operation.bumpSequence({
                bumpTo: operations[i].bumpTo,
              }),
            );
          } else if (
            operations[i].type === operationsName.manageData
          ) {
            transaction = transaction.addOperation(
              Operation.manageData({
                name: operations[i].name,
                value: operations[i].value,
              }),
            );
          } else if (
            operations[i].type === operationsName.accountMerge
          ) {
            transaction = transaction.addOperation(
              Operation.accountMerge({
                destination: operations[i].destination,
              }),
            );
          } else if (
            operations[i].type === operationsName.allowTrust
          ) {
            transaction = transaction.addOperation(
              Operation.allowTrust({
                trustor: operations[i].trustor,
                assetCode: operations[i].assetCode,
                authorize: operations[i].authorize,
              }),
            );
          } else if (
            operations[i].type === operationsName.changeTrust
          ) {
            transaction = transaction.addOperation(
              Operation.changeTrust({
                limit: operations[i].limit,
                asset: new Asset(
                  operations[i].asset.asset_code,
                  operations[i].asset.asset_issuer,
                ),
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_signer`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                signer: {
                  ed25519PublicKey: operations[i].signer,
                  weight: operations[i].weight,
                },
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_set_flags`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                setFlags: operations[i].setFlags,
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_inflation`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                inflationDest: operations[i].destination,
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_threshold`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                lowThreshold: operations[i].low,
                medThreshold: operations[i].medium,
                highThreshold: operations[i].high,
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_clear_flag`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                clearFlags: operations[i].clearFlags,
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_home_domain`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                homeDomain: operations[i].homeDomain,
              }),
            );
          } else if (
            operations[i].type ===
            `${operationsName.setOptions}_master_weight`
          ) {
            transaction = transaction.addOperation(
              Operation.setOptions({
                masterWeight: operations[i].masterWeight,
              }),
            );
          } else if (
            operations[i].type === operationsName.manageBuyOffer
          ) {
            let sellingAsset;
            let buyingAsset;

            if (operations[i].sellingAsset.asset_type === 'native') {
              sellingAsset = Asset.native();
            } else {
              sellingAsset = new Asset(
                operations[i].sellingAsset.asset_code,
                operations[i].sellingAsset.asset_issuer,
              );
            }

            if (operations[i].buyingAsset.asset_type === 'native') {
              buyingAsset = Asset.native();
            } else {
              buyingAsset = new Asset(
                operations[i].buyingAsset.asset_code,
                operations[i].buyingAsset.asset_issuer,
              );
            }

            transaction = transaction.addOperation(
              Operation.manageBuyOffer({
                selling: sellingAsset,
                buying: buyingAsset,
                buyAmount: operations[i].buying,
                price: {
                  n: 1 * 10 ** 7,
                  d: Math.round(
                    (Number(operations[i].buying) /
                      Number(operations[i].selling)) *
                      10 ** 7,
                  ),
                },
                offerId: operations[i].offerId,
              }),
            );
          } else if (
            operations[i].type === operationsName.createPassiveOffer
          ) {
            let sellingAsset;
            let buyingAsset;

            if (operations[i].sellingAsset.asset_type === 'native') {
              sellingAsset = Asset.native();
            } else {
              sellingAsset = new Asset(
                operations[i].sellingAsset.asset_code,
                operations[i].sellingAsset.asset_issuer,
              );
            }

            if (operations[i].buyingAsset.asset_type === 'native') {
              buyingAsset = Asset.native();
            } else {
              buyingAsset = new Asset(
                operations[i].buyingAsset.asset_code,
                operations[i].buyingAsset.asset_issuer,
              );
            }

            transaction = transaction.addOperation(
              Operation.createPassiveSellOffer({
                selling: sellingAsset,
                buying: buyingAsset,
                amount: operations[i].selling,
                price: {
                  n: 1 * 10 ** 7,
                  d: Math.round(
                    (Number(operations[i].selling) /
                      Number(operations[i].buying)) *
                      10 ** 7,
                  ),
                },
              }),
            );
          } else if (
            operations[i].type ===
            operationsName.pathPaymentStrictSend
          ) {
            let sendAsset;
            let destAsset;
            let isOneXLM = false;

            if (operations[i].destAsset.asset_type === 'native') {
              isOneXLM = true;
              destAsset = Asset.native();
            } else {
              destAsset = new Asset(
                operations[i].destAsset.asset_code,
                operations[i].destAsset.asset_issuer,
              );
            }

            if (operations[i].sendAsset.asset_type === 'native') {
              isOneXLM = true;
              sendAsset = Asset.native();
            } else {
              sendAsset = new Asset(
                operations[i].sendAsset.asset_code,
                operations[i].sendAsset.asset_issuer,
              );
            }

            const params = {
              destAsset,
              sendAsset,
              destMin: operations[i].destMin,
              sendAmount: operations[i].sendAmount,
              destination: operations[i].destination,
            };

            if (!isOneXLM) {
              params.path = [Asset.native()];
            }

            transaction = transaction.addOperation(
              Operation.pathPaymentStrictSend(params),
            );
          } else if (
            operations[i].type === operationsName.pathPayment
          ) {
            let sendAsset;
            let destAsset;
            let isOneXLM = false;

            if (operations[i].destAsset.asset_type === 'native') {
              isOneXLM = true;
              destAsset = Asset.native();
            } else {
              destAsset = new Asset(
                operations[i].destAsset.asset_code,
                operations[i].destAsset.asset_issuer,
              );
            }

            if (operations[i].sendAsset.asset_type === 'native') {
              isOneXLM = true;
              sendAsset = Asset.native();
            } else {
              sendAsset = new Asset(
                operations[i].sendAsset.asset_code,
                operations[i].sendAsset.asset_issuer,
              );
            }

            const params = {
              sendAsset,
              destAsset,
              sendMax: operations[i].sendMax,
              destAmount: operations[i].destAmount,
              destination: operations[i].destination,
            };

            if (!isOneXLM) {
              params.path = [Asset.native()];
            }

            transaction = transaction.addOperation(
              Operation.pathPaymentStrictReceive(params),
            );
          }
        }

        if (memo.checked && memo.text) {
          transaction = transaction.addMemo(Memo.text(memo.text));
        }

        transaction = transaction.setTimeout(180).build();

        transaction.sign(sourceKeys);

        return server.submitTransaction(transaction);
      });

    return [true, result.hash];
  } catch (err: any) {
    if (err && err.response && err.response.data) {
      return [false, showError(err.response.data)];
    }

    return [
      false,
      'One of the operations failed (none were applied).',
    ];
  }
};
