import { Networks } from '@stellar/stellar-sdk';

const changeNetworkEvent = (n = 'TESTNET') => {
  const network =
    n === 'MAINNET' ? Networks.PUBLIC : Networks.TESTNET;

  if (localStorage.getItem('isDesktop') !== 'true') {
    chrome.tabs.query({}, (tabs) => {
      for (let i = 0; i < tabs.length; i += 1) {
        chrome.tabs.sendMessage(tabs[i].id, {
          type: 'RABET_EXTENSION_CHANGE_NETWORK_EVENT',
          detail: {
            network,
          },
        });
      }
    });
  }
};

export default changeNetworkEvent;
