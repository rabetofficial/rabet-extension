import store from '../store';
import config from '../../config';

export default (id) => {
  const { options } = store.getState();
  const { explorer } = options;

  if (explorer === 'steexp') {
    return `${config.STEEXP_EXPLORER}/tx/${id}`;
  }

  return `${config.STEEXP_EXPLORER}/tx/${id}`;
};
