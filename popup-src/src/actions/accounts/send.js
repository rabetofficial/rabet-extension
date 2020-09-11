import StellarSdk from 'stellar-sdk';

import payment from 'Root/operations/payment';

export default async (operations) => {
  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: StellarSdk.Networks.PUBNET,
  });

  for (let i = 0; i < operations.length; i++) {
    if (operations[i].type === 'payment') {
      transaction.addOperation(payment({
        destination: operations[i].destination,
        asset: operations[i].asset,
        amount: operations[i].amount,
      }));
    }
  }
};
