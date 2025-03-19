import { getAsync } from './chromeHelper';
import { encrypt, decrypt } from './crypto';

export const get = <T>(key: string, password?: string) =>
  new Promise((resolve, _) => {
    chrome.storage.local.get([key], (result: any) => {
      const data = result[key];

      if (!data) {
        return resolve(null);
      }

      if (!password) {
        return resolve(data);
      }

      let jsonData: any;

      try {
        const decrypredData = decrypt(password, data);

        jsonData = JSON.parse(decrypredData);
      } catch (e) {
        return resolve(null);
      }

      return resolve(jsonData);
    });
  });

export const getAndDecrypt = async <T>(key: string, password: string) => {
  const result = await getAsync<T>(key);

  if (!result) {
    return null;
  }

  try {
    const decrypredData: string = decrypt(password, result);

    const parsedData: T = JSON.parse(decrypredData);

    return parsedData;
  } catch (e) {
    return null;
  }
};

export const set = (key: string, value: any, password?: string) =>
  new Promise((resolve, reject) => {
    try {
      let dataToBeSet: any;

      if (password) {
        const encryptedData = encrypt(password, JSON.stringify(value));

        dataToBeSet = encryptedData;
      } else {
        dataToBeSet = value;
      }

      chrome.storage.local.set({ [`${key}`]: dataToBeSet }, () => {
        resolve(true);
      });
    } catch (e) {
      reject();
    }
  });
