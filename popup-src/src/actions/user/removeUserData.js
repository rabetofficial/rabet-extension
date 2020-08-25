import { set } from 'Root/helpers/storage';

export default () => new Promise((resolve) => {
  set('data', null)
    .then(() => {
      resolve();
    });
});
