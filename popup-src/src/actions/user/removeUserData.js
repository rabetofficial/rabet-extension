import store from 'Root/store';
import types from 'Root/actions';

export default () => new Promise((resolve) => {
  chrome.storage.local.set({ data: null }, function() {
    resolve()
  });
});
