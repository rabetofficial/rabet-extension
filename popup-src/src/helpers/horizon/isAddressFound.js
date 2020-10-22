import fetch from 'node-fetch';

import currentNetwork from './currentNetwork';

export default async (address) => new Promise((resolve, reject) => {
  fetch(`${currentNetwork().url}/accounts/${address}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      resolve(data);
    })
    .catch(e => {
      resolve({
        "status": 400,
      });
    });
});
