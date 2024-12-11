import { encrypt, decrypt } from './crypto';

export const get = (key: string, password?: string) =>
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

export const set = (key: string, value: any, password?: string) =>
  new Promise((resolve, reject) => {
    try {
      let dataToBeSet: any;

      if (password) {
        const encryptedData = encrypt(
          password,
          JSON.stringify(value),
        );

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
