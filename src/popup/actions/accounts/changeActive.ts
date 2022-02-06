import types from '../index';
import store from '../../store';
import interval from './interval';
import storeAccount from './store';
import changeAccountEvent from '../../events/changeAccount';

export default async (publicKey) => {
  changeAccountEvent(publicKey);

  store.dispatch({
    publicKey,
    type: types.accounts.CHANGE_ACTIVE,
  });

  interval(publicKey);

  await storeAccount();

  return true;
};
