import store from 'Root/store';
import types from 'Root/actions';
import config from 'Root/config';

import getData from './getData';

export default (address) => {
  const p = setInterval(function () {
    getData(address);
  }, config.INTERVAL_TIME_SECONDS * 1000);

  store.dispatch({
    type: types.interval.START,
    interval: p,
  });
};
