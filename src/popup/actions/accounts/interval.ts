import store from 'popup/store';
import { stop, start } from 'popup/reducers/interval';

import getData from './getData';
import config from '../../../config';

export default (publicKey: string, isNotChecked: boolean) => {
  const { interval } = store.getState();

  if (interval && isNotChecked) {
    return;
  }

  stop();

  const p = setInterval(() => {
    getData(publicKey);
  }, config.INTERVAL_TIME_SECONDS * 1000);

  start(p);
};
