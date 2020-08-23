import store from 'Root/store';
import types from 'Root/actions';

import { encrypt } from 'Root/helpers/crypto';

export default async (password) => {
  const accounts = [];

  const encryptedData = encrypt(password, JSON.stringify(accounts));

  chrome.storage.local.set({ data: encryptedData }, function() {
    store.dispatch({
      accounts,
      type: types.accounts.LOAD,
    })
  });
};
