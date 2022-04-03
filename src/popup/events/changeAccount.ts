const changeAccountEvent = (publicKey: string) => {
  if (localStorage.getItem('isDesktop') !== 'true') {
    chrome.tabs.query({}, (tabs) => {
      for (let i = 0; i < tabs.length; i += 1) {
        chrome.tabs.sendMessage(tabs[i].id, {
          type: 'RABET_EXTENSION_CHANGE_ACCOUNT_EVENT',
          detail: {
            publicKey,
          },
        });
      }
    });
  }
};

export default changeAccountEvent;
