export default (e) => {
  chrome.runtime.sendMessage(
    {
      type: 'RABET_EXTENSION_LOGIN',
      detail: e,
    },
    (response) => {
      document.dispatchEvent(
        new CustomEvent('RABET_EXTENSION_LOGIN_RESPONSE', {
          detail: response,
        }),
      );
    },
  );
};
