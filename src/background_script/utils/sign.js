import {
  xdr,
  Keypair,
  Networks,
  Transaction,
} from '@stellar/stellar-sdk';

export default (userXdr, network, account) => {
  try {
    console.log('account');
    console.log(account);
    const key = Keypair.fromSecret(account.privateKey);
    console.log('key');
    console.log(key);
    console.log(userXdr);
    const obj = xdr.TransactionEnvelope.fromXDR(userXdr, 'base64');
    console.log('obj');
    console.log(obj);

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
