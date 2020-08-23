export default async () => {
  chrome.storage.local.set({ data: 'this is shit' }, function() {
    console.log('DONE');
  });

  chrome.storage.local.get(['key'], function(result) {
    console.log('Value currently is ' + result.key);
  });

};
