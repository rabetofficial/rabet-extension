import { encrypt, decrypt } from './crypto';

export const get = (key: string, password?: string) =>
  new Promise((resolve, reject) => {
    if (localStorage.getItem('isDesktop') !== 'true') {
      chrome.storage.local.get([key], (result: any) => {
        const data = result[key];

        if (!data) {
          return resolve(null);
        }

        if (!password) {
          return resolve(data);
        }

        const decrypredData = decrypt(password, data);
        let jsonData;

        try {
          jsonData = JSON.parse(decrypredData);
        } catch (e) {
          return reject();
        }

        return resolve(jsonData);
      });
    } else {
      const data = localStorage.getItem(key);

      if (!data) {
        return resolve(null);
      }

      if (!password) {
        return resolve(JSON.parse(data));
      }

      const decrypredData = decrypt(password, data);
      let jsonData;

      try {
        jsonData = JSON.parse(decrypredData);
      } catch (e) {
        return reject();
      }

      return resolve(jsonData);
    }
  });

export const set = (key: string, value: any, password?: string) =>
  new Promise((resolve, reject) => {
    try {
      let dataToBeSet;

      if (password) {
        const encryptedData = encrypt(
          password,
          JSON.stringify(value),
        );

        dataToBeSet = encryptedData;
      } else {
        dataToBeSet = value;
      }

      if (localStorage.getItem('isDesktop') !== 'true') {
        chrome.storage.local.set({ [`${key}`]: dataToBeSet }, () => {
          resolve(true);
        });
      } else {
        localStorage.setItem(key, dataToBeSet);
        resolve(true);
      }
    } catch (e) {
      reject();
    }
  });
