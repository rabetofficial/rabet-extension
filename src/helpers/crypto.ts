import aes256 from 'aes256';

export const encrypt = (key: string, text: string) =>
  aes256.encrypt(key, text);
export const decrypt = (key: string, text: string) =>
  aes256.decrypt(key, text);
