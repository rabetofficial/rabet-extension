import {
  xdr,
  Keypair,
  Networks,
  Transaction,
} from 'stellar-sdk';

export default (userXdr, network, account) => {
  try {
    const key = Keypair.fromSecret(account.privateKey);
    const obj = xdr.TransactionEnvelope.fromXDR(userXdr, 'base64');

    let stellarNetwork;

    if (network === 'mainnet') {
      stellarNetwork = Networks.PUBLIC;
    } else {
      stellarNetwork = Networks.TESTNET;
    }

    const transaction = new Transaction(obj, stellarNetwork);

    transaction.sign(key);

    const newXdr = transaction.toEnvelope().toXDR('base64');

    return newXdr;
  } catch (e) {
    return null;
  }
};
