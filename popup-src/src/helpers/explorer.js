import store from 'Root/store';
import config from 'Root/config';

export default (id) => {
  const { options } = store.getState();
  const { explorer } = options;

  if (explorer === 'steexp') {
    return `${config.STEEXP_EXPLORER}/tx/${id}`;
  }

  return `${config.STEEXP_EXPLORER}/tx/${id}`;
};
