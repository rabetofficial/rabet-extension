import types from '../index';
import store from '../../store';
import isDomain from '../../utils/validate/domain';
import getHostOfUrl from '../../utils/getHostOfUrl';

const getHost = () => new Promise((resolve) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const host = getHostOfUrl(tab.url);

    if (isDomain(host)) {
      store.dispatch({
        type: types.host.CHANGE,
        host,
      });
    }

    resolve();
  });
});

export default getHost;
