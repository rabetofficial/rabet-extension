export const createWindowAsync = (
  params: chrome.windows.CreateData,
): Promise<chrome.windows.Window> =>
  new Promise((res) => {
    chrome.windows.create(params, (window) => {
      res(window);
    });
  });

export const getAsync = <T>(key: any): Promise<T | null> =>
  new Promise((res, rej) => {
    try {
      chrome.storage.local.get(key, (result) => {
        if (chrome.runtime.lastError) {
          rej(chrome.runtime.lastError);
        } else {
          const data: T = result[key];

          res(data);
        }
      });
    } catch (e) {
      return null;
    }
  });
