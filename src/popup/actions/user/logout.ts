import { logout } from 'popup/reducers/user';
import { stop } from 'popup/reducers/interval';

export default async () => {
  logout();
  stop();
};
