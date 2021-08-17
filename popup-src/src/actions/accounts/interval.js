import types from '../index';
import store from '../../store';
import getData from './getData';
import config from '../../config';

export default (address, isNotChecked) => {
  const { interval } = store.getState();

  if (interval && isNotChecked) {
    return;
  }

  store.dispatch({
    type: types.interval.STOP,
  });

  const p = setInterval(() => {
    getData(address);
  }, config.INTERVAL_TIME_SECONDS * 1000);

  store.dispatch({
    type: types.interval.START,
    interval: p,
  });
};
