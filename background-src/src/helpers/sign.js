import StellarSdk, { Keypair, Transaction } from 'stellar-sdk';

export default (xdr, network, account) => {
  try {
    const key = Keypair.fromSecret(account.privateKey);
    const obj = StellarSdk.xdr.TransactionEnvelope.fromXDR(xdr, 'base64');

    let stellarNetwork;

    if (network === 'mainnet') {
      stellarNetwork = StellarSdk.Networks.PUBLIC;
    } else {
      stellarNetwork = StellarSdk.Networks.TESTNET;
    }

    const transaction = new Transaction(obj, stellarNetwork);

    transaction.sign(key);

    const newXdr = transaction.toEnvelope().toXDR('base64');

    return newXdr;
  } catch (e) {
    return null;
  }
};
