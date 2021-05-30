export default (e) => {
  chrome.runtime.sendMessage(
    {
      type: 'RABET_EXTENSION_SIGN',
      detail: e.detail,
    },
    (response) => {
      document.dispatchEvent(
        new CustomEvent('RABET_EXTENSION_SIGN_RESPONSE', {
          detail: response,
        }),
      );
    },
  );
};
