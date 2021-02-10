export default (id) => {
  chrome.windows.remove(id);
}
