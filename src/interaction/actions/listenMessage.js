export default async () =>
  new Promise((resolve) => {
    global.chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        if (message.type === 'RABET_GENERATED_ID') {
          global.sessionStorage.setItem('page', message.page);
          global.sessionStorage.setItem('host', message.detail.host);
          global.sessionStorage.setItem(
            'title',
            message.detail.title,
          );
          global.sessionStorage.setItem(
            'generatedId',
            message.generatedId,
          );

          if (message.activeAcconut) {
            global.sessionStorage.setItem(
              'accountName',
              message.activeAcconut.name,
            );
            global.sessionStorage.setItem(
              'accountPublicKey',
              message.activeAcconut.publicKey,
            );
          }

          if (message.xdr) {
            global.sessionStorage.setItem('xdr', message.xdr.xdr);
            global.sessionStorage.setItem(
              'network',
              message.xdr.network,
            );
          }

          if (message.destination) {
            global.sessionStorage.setItem(
              'destination',
              message.destination,
            );
          }

          sendResponse({ type: 'RABET_GENERATED_ID_RECEIVED' });
          resolve(true);
        }
      },
    );
  });
