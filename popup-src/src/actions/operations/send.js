import StellarSdk, { Operation } from 'stellar-sdk';

import store from 'Root/store';
import payment from 'Root/operations/payment';
import * as route from 'Root/staticRes/routes';
import setOptions from 'Root/operations/setOptions';
import allowTrust from 'Root/operations/allowTrust';
import manageData from 'Root/operations/manageData';
import codeToIssuer from 'Root/helpers/codeToIssuer';
import changeTrust from 'Root/operations/changeTrust';
import accountMerge from 'Root/operations/accountMerge';
import bumpSequence from 'Root/operations/bumpSequence';
import createAccount from 'Root/operations/createAccount';
import manageBuyOffer from 'Root/operations/manageBuyOffer';
import * as operationsName from 'Root/staticRes/operations';
import currentActiveAccount from 'Root/helpers/activeAccount';
import currentNetwork from 'Root/helpers/horizon/currentNetwork';
import pathPaymentStrictSend from 'Root/operations/pathPaymentStrictSend';
import createPassiveSellOffer from 'Root/operations/createPassiveSellOffer';
import pathPaymentStrictReceive from 'Root/operations/pathPaymentStrictReceive';

export default async (push) => {
  push(route.loadingNetworkPage);

  const { operations, memo } = store.getState().transaction;

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

        else if (operations[i].type === operationsName.bumpSequence) {
          transaction = transaction.addOperation(bumpSequence({
            bumpTo: operations[i].bumpTo,
          }));
        }

        else if (operations[i].type === operationsName.manageData) {
          transaction = transaction.addOperation(manageData({
            name: operations[i].name,
            value: operations[i].value,
          }));
        }

        else if (operations[i].type === operationsName.accountMerge) {
          transaction = transaction.addOperation(accountMerge({
            destination: operations[i].destination,
          }));
        }

        else if (operations[i].type === operationsName.allowTrust) {
          transaction = transaction.addOperation(allowTrust({
            trustor: operations[i].trustor,
            assetCode: operations[i].assetCode,
            authorize: operations[i].authorize,
          }));
        }

        else if (operations[i].type === operationsName.changeTrust) {
          transaction = transaction.addOperation(changeTrust({
            limit: operations[i].limit,
            asset: new StellarSdk.Asset(operations[i].asset.asset_code, operations[i].asset.asset_issuer),
          }));
        }

        else if (operations[i].type === operationsName.setOptionsSigner) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            signer: {
              ed25519PublicKey: operations[i].signer,
              weight: operations[i].weight,
            },
          }))
        }

        else if (operations[i].type === operationsName.setOptionsSetFlags) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            setFlags: operations[i].setFlags,
          }));
        }

        else if (operations[i].type === operationsName.setOptionsInflationDest) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            inflationDest: operations[i].destination,
          }));
        }

        else if (operations[i].type === operationsName.setOptionsThreshold) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            lowThreshold: operations[i].low,
            medThreshold: operations[i].medium,
            highThreshold: operations[i].high,
          }));
        }

        else if (operations[i].type === operationsName.setOptionsClearFlags) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            clearFlags: operations[i].clearFlags,
          }));
        }

        else if (operations[i].type === operationsName.setOptionsHomeDomain) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            homeDomain: operations[i].homeDomain,
          }));
        }

        else if (operations[i].type === operationsName.setOptionsMasterWeight) {
          transaction = transaction.addOperation(StellarSdk.Operation.setOptions({
            masterWeight: operations[i].masterWeight,
          }));
        }

        else if (operations[i].type === operationsName.manageBuyOffer) {
          let sellingAsset;
          let buyingAsset;

          if (operations[i].sellingAsset.asset_type === 'native') {
            sellingAsset = StellarSdk.Asset.native();
          } else {
            sellingAsset = new StellarSdk.Asset(operations[i].sellingAsset.asset_code, operations[i].sellingAsset.asset_issuer);
          }

          if (operations[i].buyingAsset.asset_type === 'native') {
            buyingAsset = StellarSdk.Asset.native();
          } else {
            buyingAsset = new StellarSdk.Asset(operations[i].buyingAsset.asset_code, operations[i].buyingAsset.asset_issuer);
          }

          transaction = transaction.addOperation(manageBuyOffer({
            selling: sellingAsset,
            buying: buyingAsset,
            buyAmount: operations[i].buying,
            price: {
              n: 1 * 10 ** 7,
              d: Math.round(Number(operations[i].buying) / Number(operations[i].selling) * 10 ** 7),
            },
            offerId: operations[i].offerId,
          }));
        }

        else if (operations[i].type === operationsName.createPassiveSellOffer) {
          let sellingAsset;
          let buyingAsset;

          if (operations[i].sellingAsset.asset_type === 'native') {
            sellingAsset = StellarSdk.Asset.native();
          } else {
            sellingAsset = new StellarSdk.Asset(operations[i].sellingAsset.asset_code, operations[i].sellingAsset.asset_issuer);
          }

          if (operations[i].buyingAsset.asset_type === 'native') {
            buyingAsset = StellarSdk.Asset.native();
          } else {
            buyingAsset = new StellarSdk.Asset(operations[i].buyingAsset.asset_code, operations[i].buyingAsset.asset_issuer);
          }

          transaction = transaction.addOperation(createPassiveSellOffer({
            selling: sellingAsset,
            buying: buyingAsset,
            amount: operations[i].selling,
            price: {
              n: 1 * 10 ** 7,
              d: Math.round(Number(operations[i].selling) / Number(operations[i].buying) * 10 ** 7),
            },
          }));
        }

        else if (operations[i].type === operationsName.pathPaymentStrictSend) {
          let sendAsset;
          let destAsset;

          if (operations[i].destAsset.asset_type === 'native') {
            destAsset = StellarSdk.Asset.native();
          } else {
            destAsset = new StellarSdk.Asset(operations[i].destAsset.asset_code, operations[i].destAsset.asset_issuer);
          }

          if (operations[i].sendAsset.asset_type === 'native') {
            sendAsset = StellarSdk.Asset.native();
          } else {
            sendAsset = new StellarSdk.Asset(operations[i].sendAsset.asset_code, operations[i].sendAsset.asset_issuer);
          }

          transaction = transaction.addOperation(pathPaymentStrictSend({
            destAsset,
            sendAsset,
            destMin: operations[i].destMin,
            sendAmount: operations[i].sendAmount,
            destination: operations[i].destination,
          }));
        }

        else if (operations[i].type === operationsName.pathPaymentStrictReceive) {
          let sendAsset;
          let destAsset;

          if (operations[i].destAsset.asset_type === 'native') {
            destAsset = StellarSdk.Asset.native();
          } else {
            destAsset = new StellarSdk.Asset(operations[i].destAsset.asset_code, operations[i].destAsset.asset_issuer);
          }

          if (operations[i].sendAsset.asset_type === 'native') {
            sendAsset = StellarSdk.Asset.native();
          } else {
            sendAsset = new StellarSdk.Asset(operations[i].sendAsset.asset_code, operations[i].sendAsset.asset_issuer);
          }

          transaction = transaction.addOperation(pathPaymentStrictReceive({
            sendAsset,
            destAsset,
            sendMax: operations[i].sendMax,
            destAmount: operations[i].destAmount,
            destination: operations[i].destination,
          }));
        }
      }

      if (memo.checked && memo.text) {
        transaction = transaction
          .addMemo(StellarSdk.Memo.text(memo.text));
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
      console.log(JSON.stringify(err));
      push({
        pathname: route.errorPage,
        state: { message: err.message, },
      });
    });
};
