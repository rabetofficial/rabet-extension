import store from 'Root/store';
import types from 'Root/actions';

export default () => new Promise((resolve, reject) => {
  chrome.storage.local.get(['data'], function(result) {
    if (result.data) {
      store.dispatch({
        registered: true,
        type: types.user.IS_REGISTERED,
      });

      return resolve();
    }

    store.dispatch({
      registered: false,
      type: types.user.IS_REGISTERED,
    });

    return resolve();
  });
});
