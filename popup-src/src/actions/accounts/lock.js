import types from '../index';
import store from '../../store';
import { set } from '../../helpers/storage';
import * as route from '../../staticRes/routes';

export default (push) => {
  localStorage.clear();

  store.dispatch({
    type: types.user.LOGOUT,
  });

  store.dispatch({
    type: types.interval.STOP,
  });

  set('timer', {});

  push({
    pathname: route.settingPage,
    state: {
      hadLogged: false,
    },
  });
};
