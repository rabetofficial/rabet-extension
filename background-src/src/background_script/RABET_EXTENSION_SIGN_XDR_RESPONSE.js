import sign from '../helpers/sign';
import { get } from '../helpers/storage';
import hasLoggedBefore from '../helpers/hasLoggedBefore';

export default (message, sender, sendResponse, sendResponseCollection, window) => {
  console.log(message)
  if (message.result === 'confirm') {
    hasLoggedBefore()
      .then((hasLogged) => {
        if (!hasLogged) {
          sendResponseCollection[message.id]({
            ok: false,
            message: 'no-user-logged',
          });

          return;
        }

        get('data', hasLogged).then((accounts) => {
          if (!accounts) {
            sendResponseCollection[message.id]({ ok: false, message: 'no-account' });

            return;
          }

          if (!accounts.length) {
            sendResponseCollection[message.id]({ ok: false, message: 'no-account' });

            return;
          }

          const activeAcconut = accounts.find((x) => x.active === true);
          const signed = sign(message.xdr.xdr, message.xdr.network, activeAcconut);

          sendResponseCollection[message.id]({
            ok: true,
            message: {
              xdr: signed,
            },
          });
        });
      })
      .catch(() => {
        sendResponseCollection[message.id]({
          ok: false,
          message: 'no-user-logged',
        });
      });
  } else if (message.result === 'close') {
    sendResponseCollection[message.id]({
      ok: false,
      message: 'invalid-xdr',
    });
  } else {
    console.log('i happen for some reason')
    sendResponseCollection[message.id]({ ok: false, message: 'user-rejected' });
  }

  chrome.windows.remove(window.id);
};
