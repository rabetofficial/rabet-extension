import aes256 from 'aes256';

export const encrypt = (key, text) => {
  return aes256.encrypt(key, text);
};

export const decrypt = (key, text) => {
  return aes256.decrypt(key, text);  
};
