import StellarSdk from 'stellar-sdk';

import store from '../../store';
import isNative from '../../utils/isNative';
import payment from '../../operations/payment';
import * as route from '../../staticRes/routes';
import showError from '../../utils/errorMessage';
import allowTrust from '../../operations/allowTrust';
import manageData from '../../operations/manageData';
import changeTrust from '../../operations/changeTrust';
import accountMerge from '../../operations/accountMerge';
import bumpSequence from '../../operations/bumpSequence';
import createAccount from '../../operations/createAccount';
import manageBuyOffer from '../../operations/manageBuyOffer';
import * as operationsName from '../../staticRes/operations';
import currentActiveAccount from '../../utils/activeAccount';
import currentNetwork from '../../utils/horizon/currentNetwork';
import pathPaymentStrictSend from '../../operations/pathPaymentStrictSend';
import createPassiveSellOffer from '../../operations/createPassiveSellOffer';
import pathPaymentStrictReceive from '../../operations/pathPaymentStrictReceive';

export default async (push) => {
  push(route.loadingNetworkPage);

  const { operations, memo } = store.getState().transaction;

  if (!operations.length) {
    // ERROR! NO OPERATION FOUND
    return;
  }

  for (let i = 0; i < operations.length; i += 1) {
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
        fee: '50000',
        networkPassphrase: passphrase,
      });

      for (let i = 0; i < operations.length; i += 1) {
        if (operations[i].type === operationsName.payment) {
          const { asset } = operations[i];
          let stellarAsset;

          if (operations[i].isAccountNew) {
            transaction = transaction.addOperation(
              createAccount({
                startingBalance: operations[i].amount,
                destination: operations[i].destination,
              }),
            );
          } else {
            if (isNative(asset)) {
              stellarAsset = StellarSdk.Asset.native();
            } else {
              stellarAsset = new StellarSdk.Asset(asset.asset_code, asset.asset_issuer);
            }

            transaction = transaction.addOperation(
              payment({
                asset: stellarAsset,
                amount: operations[i].amount,
                destination: operations[i].destination,
              }),
            );
          }
        } else if (operations[i].type === operationsName.bumpSequence) {
          transaction = transaction.addOperation(
            bumpSequence({
              bumpTo: operations[i].bumpTo,
            }),
          );
        } else if (operations[i].type === operationsName.manageData) {
          transaction = transaction.addOperation(
            manageData({
              name: operations[i].name,
              value: operations[i].value,
            }),
          );
        } else if (operations[i].type === operationsName.accountMerge) {
          transaction = transaction.addOperation(
            accountMerge({
              destination: operations[i].destination,
            }),
          );
        } else if (operations[i].type === operationsName.allowTrust) {
          transaction = transaction.addOperation(
            allowTrust({
              trustor: operations[i].trustor,
              assetCode: operations[i].assetCode,
              authorize: operations[i].authorize,
            }),
          );
        } else if (operations[i].type === operationsName.changeTrust) {
          transaction = transaction.addOperation(
            changeTrust({
              limit: operations[i].limit,
              asset: new StellarSdk.Asset(
                operations[i].asset.asset_code,
                operations[i].asset.asset_issuer,
              ),
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsSigner) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              signer: {
                ed25519PublicKey: operations[i].signer,
                weight: operations[i].weight,
              },
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsSetFlags) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              setFlags: operations[i].setFlags,
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsInflationDest) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              inflationDest: operations[i].destination,
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsThreshold) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              lowThreshold: operations[i].low,
              medThreshold: operations[i].medium,
              highThreshold: operations[i].high,
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsClearFlags) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              clearFlags: operations[i].clearFlags,
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsHomeDomain) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              homeDomain: operations[i].homeDomain,
            }),
          );
        } else if (operations[i].type === operationsName.setOptionsMasterWeight) {
          transaction = transaction.addOperation(
            StellarSdk.Operation.setOptions({
              masterWeight: operations[i].masterWeight,
            }),
          );
        } else if (operations[i].type === operationsName.manageBuyOffer) {
          let sellingAsset;
          let buyingAsset;

          if (operations[i].sellingAsset.asset_type === 'native') {
            sellingAsset = StellarSdk.Asset.native();
          } else {
            sellingAsset = new StellarSdk.Asset(
              operations[i].sellingAsset.asset_code,
              operations[i].sellingAsset.asset_issuer,
            );
          }

          if (operations[i].buyingAsset.asset_type === 'native') {
            buyingAsset = StellarSdk.Asset.native();
          } else {
            buyingAsset = new StellarSdk.Asset(
              operations[i].buyingAsset.asset_code,
              operations[i].buyingAsset.asset_issuer,
            );
          }

          transaction = transaction.addOperation(
            manageBuyOffer({
              selling: sellingAsset,
              buying: buyingAsset,
              buyAmount: operations[i].buying,
              price: {
                n: 1 * 10 ** 7,
                d: Math.round(
                  (Number(operations[i].buying) / Number(operations[i].selling))
                  * 10 ** 7,
                ),
              },
              offerId: operations[i].offerId,
            }),
          );
        } else if (operations[i].type === operationsName.createPassiveSellOffer) {
          let sellingAsset;
          let buyingAsset;

          if (operations[i].sellingAsset.asset_type === 'native') {
            sellingAsset = StellarSdk.Asset.native();
          } else {
            sellingAsset = new StellarSdk.Asset(
              operations[i].sellingAsset.asset_code,
              operations[i].sellingAsset.asset_issuer,
            );
          }

          if (operations[i].buyingAsset.asset_type === 'native') {
            buyingAsset = StellarSdk.Asset.native();
          } else {
            buyingAsset = new StellarSdk.Asset(
              operations[i].buyingAsset.asset_code,
              operations[i].buyingAsset.asset_issuer,
            );
          }

          transaction = transaction.addOperation(
            createPassiveSellOffer({
              selling: sellingAsset,
              buying: buyingAsset,
              amount: operations[i].selling,
              price: {
                n: 1 * 10 ** 7,
                d: Math.round(
                  (Number(operations[i].selling) / Number(operations[i].buying))
                  * 10 ** 7,
                ),
              },
            }),
          );
        } else if (operations[i].type === operationsName.pathPaymentStrictSend) {
          let sendAsset;
          let destAsset;
          let isOneXLM = false;

          if (operations[i].destAsset.asset_type === 'native') {
            isOneXLM = true;
            destAsset = StellarSdk.Asset.native();
          } else {
            destAsset = new StellarSdk.Asset(
              operations[i].destAsset.asset_code,
              operations[i].destAsset.asset_issuer,
            );
          }

          if (operations[i].sendAsset.asset_type === 'native') {
            isOneXLM = true;
            sendAsset = StellarSdk.Asset.native();
          } else {
            sendAsset = new StellarSdk.Asset(
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
            params.path = [new StellarSdk.Asset.native()];
          }

          transaction = transaction.addOperation(pathPaymentStrictSend(params));
        } else if (operations[i].type === operationsName.pathPaymentStrictReceive) {
          let sendAsset;
          let destAsset;
          let isOneXLM = false;

          if (operations[i].destAsset.asset_type === 'native') {
            isOneXLM = true;
            destAsset = StellarSdk.Asset.native();
          } else {
            destAsset = new StellarSdk.Asset(
              operations[i].destAsset.asset_code,
              operations[i].destAsset.asset_issuer,
            );
          }

          if (operations[i].sendAsset.asset_type === 'native') {
            isOneXLM = true;
            sendAsset = StellarSdk.Asset.native();
          } else {
            sendAsset = new StellarSdk.Asset(
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
            params.path = [new StellarSdk.Asset.native()];
          }

          transaction = transaction.addOperation(pathPaymentStrictReceive(params));
        }
      }

      if (memo.checked && memo.text) {
        transaction = transaction.addMemo(StellarSdk.Memo.text(memo.text));
      }

      transaction = transaction.setTimeout(180).build();

      transaction.sign(sourceKeys);

      return server.submitTransaction(transaction);
    })
    .then((result) => {
      push(
        route.successSubmitPage,
        {
          state: {
            hash: result.hash,
          },
        },
      );
    })
    .catch((err) => {
      if (err && err.response && err.response.data) {
        push(
          route.errorPage,
          {
            state: {
              message: showError(err.response.data),
            },
          },
        );
      } else {
        push(
          route.errorPage,
          {
            state: {
              message: 'One of the operations failed (none were applied).',
            },
          },
        );
      }
    });
};
