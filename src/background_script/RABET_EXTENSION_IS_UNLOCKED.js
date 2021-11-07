import hasLoggedBefore from './utils/hasLoggedBefore';

export default (message, sender, sendResponse) => {
  hasLoggedBefore()
    .then((hasLogged) => {
      if (hasLogged) {
        sendResponse({ ok: true, isUnlocked: true });
      } else {
        sendResponse({ ok: true, isUnlocked: false });
      }
    })
    .catch(() => {
      sendResponse({ ok: true, isUnlocked: true });
    });
};
