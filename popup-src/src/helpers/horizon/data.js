import fetch from 'node-fetch';

export default async (address) => new Promise((resolve, reject) => {
  fetch(`https://horizon.stellar.org/accounts/${address}`)
    .then(res => {
      if (res.status !== 200) {
        resolve({});
      }

      return res.json()
    })
    .then(data => {
      resolve(data);
    })
    .catch(e => {
      reject(e);
    });
});
