import types from '../index';
import store from '../../store';
import interval from './interval';
import storeAccount from './store';
import changedAccountEvent from '../../events/changedAccount';

export default async (publicKey) => {
  changedAccountEvent(publicKey);

  store.dispatch({
    publicKey,
    type: types.accounts.CHANGE_ACTIVE,
  });

  interval(publicKey);

  await storeAccount();

  return true;
};
