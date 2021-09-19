import store from '../store';
import getHostOfUrl from './getHostOfUrl';

const getIsConnected = (publicKey) => new Promise((resolve) => {
  const { connectedWebsites } = store.getState().user;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const host = getHostOfUrl(tab.url);
    const pair = `${host}/${publicKey}`;
    const isConnected = connectedWebsites.find((x) => x === pair);

    resolve(isConnected);
  });
});

export default getIsConnected;
