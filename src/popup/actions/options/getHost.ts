import isValidDomain from 'is-valid-domain';

import store from 'popup/store';
import { change } from 'popup/reducers/host';
import getHostOfUrl from 'popup/utils/getHostOfUrl';

const getHost = () =>
  new Promise((resolve) => {
    if (localStorage.getItem('isDesktop') !== 'true') {
      chrome.tabs.query(
        { active: true, currentWindow: true },
        (tabs) => {
          const tab = tabs[0];
          const host = getHostOfUrl(tab.url);

          if (isValidDomain(host)) {
            store.dispatch(change(host));
          }

          resolve(true);
        },
      );
    } else {
      store.dispatch(change('localhost'));
      resolve(true);
    }
  });

export default getHost;
