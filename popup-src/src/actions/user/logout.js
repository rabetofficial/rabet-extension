import store from '../../store';
import types from '../index';

export default async () => {
  store.dispatch({
    type: types.user.LOGOUT,
  });

  store.dispatch({
    type: types.interval.STOP,
  });
};
