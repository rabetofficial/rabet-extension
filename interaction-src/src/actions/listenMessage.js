export default async () => new Promise((resolve, reject) => {
  global.chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === 'RABET_GENERATED_ID') {
      global.sessionStorage.setItem('page', message.page);
      global.sessionStorage.setItem('host', message.detail.host);
      global.sessionStorage.setItem('title', message.detail.title);
      global.sessionStorage.setItem('generatedId', message.generatedId);

      if (message.activeAcconut) {
        global.sessionStorage.setItem('accountName', message.activeAcconut.name);
        global.sessionStorage.setItem('accountPublicKey', message.activeAcconut.publicKey);
      }

      sendResponse({ type: 'RABET_GENERATED_ID_RECEIVED' });
      resolve(true);
    }
  });
});
