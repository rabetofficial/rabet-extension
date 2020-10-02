import fetch from 'node-fetch';

export default async (address) => new Promise((resolve, reject) => {
  fetch(`https://horizon.stellar.org/accounts/${address}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      if (data.status) {
        resolve({});
      } else {
        resolve(data);
      }
    })
    .catch(e => {
      reject(e);
    });
});
