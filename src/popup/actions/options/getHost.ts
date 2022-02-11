import store from 'popup/store';
import { change } from '../../reducers/host';
import isDomain from '../../utils/validate/domain';
import getHostOfUrl from '../../utils/getHostOfUrl';

const getHost = () =>
  new Promise((resolve) => {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs) => {
        const tab = tabs[0];
        const host = getHostOfUrl(tab.url);

        if (isDomain(host)) {
          store.dispatch(change(host));
        }

        resolve(true);
      },
    );
  });

export default getHost;
