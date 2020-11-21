import store from 'Root/store';
import types from 'Root/actions';
import { set } from 'Root/helpers/storage';
import * as route from 'Root/staticRes/routes';
// import logoutAction from 'Root/actions/user/logout';

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
    pathname: route.loginPage,
    state: {
      hadLogged: false,
    },
  });
};
