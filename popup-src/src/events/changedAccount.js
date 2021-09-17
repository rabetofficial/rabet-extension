const changedAccountEvent = (publicKey) => {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage(
        tab.id,
        {
          type: 'RABET_EXTENSION_CHANGED_ACCOUNT_EVENT',
          detail: {
            publicKey,
          },
        },
      );
    }
  });
};

export default changedAccountEvent;
