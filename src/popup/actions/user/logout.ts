import store from 'popup/store';
import { logout } from 'popup/reducers/user';
import { stop } from 'popup/reducers/interval';

export default async () => {
  store.dispatch(logout());
  store.dispatch(stop());
};
