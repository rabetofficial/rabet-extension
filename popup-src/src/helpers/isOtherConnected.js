import store from '../store';
import getHostOfUrl from './getHostOfUrl';

const getIsConnected = (publicKey) => new Promise((resolve) => {
  const { connectedWebsites } = store.getState().user;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const host = getHostOfUrl(tab.url);
    const pair = `${host}/${publicKey}`;

    const connectedToHost = connectedWebsites.filter((x) => x.includes(host));

    if (!connectedToHost.length) {
      return resolve(false);
    }

    const isOtherConnected = connectedToHost.some((x) => x !== pair);

    resolve(isOtherConnected);
  });
});

export default getIsConnected;
