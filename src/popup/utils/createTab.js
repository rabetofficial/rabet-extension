export default async (url) => {
  chrome.tabs.create({ url });
};
