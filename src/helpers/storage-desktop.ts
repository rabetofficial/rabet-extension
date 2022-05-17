import fs from 'fs';
import { ipcRenderer } from 'electron';

import { encrypt, decrypt } from './crypto';

export const get = (key: string, password?: string) =>
  new Promise((resolve, reject) => {
    const storageFileName = ipcRenderer.sendSync('user-data');

    if (!fs.existsSync(storageFileName)) {
      fs.writeFileSync(storageFileName, '{}');
    }

    const storageFile = fs.readFileSync(storageFileName, 'utf8');
    const data = JSON.parse(storageFile);

    const result = data[key];

    if (!result) {
      return resolve(null);
    }

    if (!password) {
      try {
        return resolve(JSON.parse(result));
      } catch (e) {
        return resolve(result);
      }
    }

    const decrypredData = decrypt(password, result);

    let jsonData;

    try {
      jsonData = JSON.parse(decrypredData);
    } catch (e) {
      return reject();
    }

    return resolve(jsonData);
  });

export const set = (key: string, value: any, password?: string) =>
  new Promise((resolve, reject) => {
    try {
      const storageFileName = ipcRenderer.sendSync('user-data');

      if (!fs.existsSync(storageFileName)) {
        fs.writeFileSync(storageFileName, '{}');
      }

      const storageFile = fs.readFileSync(storageFileName, 'utf8');
      const data = JSON.parse(storageFile);

      if (password) {
        data[key] = encrypt(password, JSON.stringify(value));
      } else {
        data[key] = JSON.stringify(value);
      }

      fs.writeFileSync(storageFileName, JSON.stringify(data), 'utf8');

      resolve(true);
    } catch (e) {
      reject();
    }
  });
