import store from 'Root/store';
import types from 'Root/actions';

import { decrypt } from 'Root/helpers/crypto';

export default (password) => new Promise((resolve) => {
  chrome.storage.local.get(['data'], function(result) {
    if (!result.data) {
      return resolve(false);
    }

    const decrypredData = decrypt(password, result.data);
    let jsonData;

    try {
      jsonData = JSON.parse(decrypredData);
    } catch (e) {
      return resolve(false);
    }

    store.dispatch({
      password,
      type: types.user.LOGIN,
    });

    store.dispatch({
      type: types.accounts.LOAD,
      accounts: jsonData,
    })

    return resolve(true);
  });
});
