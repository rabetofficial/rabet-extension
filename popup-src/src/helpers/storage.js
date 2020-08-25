import { encrypt, decrypt } from 'Root/helpers/crypto';

export const get = (key, password) => new Promise((resolve, reject) => {
  chrome.storage.local.get([key], (result) => {
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
});

export const set = (key, value, password) => new Promise((resolve, reject) => {
  try {
    let dataToBeSet;

    if (password) {
      const encryptedData = encrypt(password, JSON.stringify(value));

      dataToBeSet = encryptedData;
    } else {
      dataToBeSet = value;
    }

    chrome.storage.local.set({ [`${key}`]: dataToBeSet }, () => {
      resolve();
    });
  } catch (e) {
    reject();
  }
});
