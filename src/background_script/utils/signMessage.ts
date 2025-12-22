import { Keypair } from '@stellar/stellar-sdk';

export default (message: string, account: any) => {
  try {
    const messageBytes = Buffer.from(message, 'utf8');
    const key = Keypair.fromSecret(account.privateKey);
    const signature = key.sign(messageBytes);
    const signatureBase64 = signature.toString('base64');

    return signatureBase64;
  } catch (e) {
    return null;
  }
};
