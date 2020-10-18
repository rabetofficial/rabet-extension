import { set } from 'Root/helpers/storage';

export default (entity) => new Promise((resolve) => {
  set(entity, null)
    .then(() => {
      resolve();
    });
});
