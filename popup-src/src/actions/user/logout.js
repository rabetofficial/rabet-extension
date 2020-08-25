import store from 'Root/store';
import types from 'Root/actions';

export default async () => {
  store.dispatch({
    type: types.user.LOGOUT,
  });
}
