import store from 'popup/store';
import { changePassword } from 'popup/reducers/user';
import storeAccounts from 'popup/actions/accounts/store';
import { FormValues } from 'popup/blocks/Setting/ChangePassword';

type changeMasterResult = 'wrong_password' | 'done' | 'failed';

const changeMasterPassword = async (
  values: FormValues,
): Promise<changeMasterResult> => {
  const { user } = store.getState();

  if (user.password !== values.oldPassword) {
    return 'wrong_password';
  }

  store.dispatch(changePassword(values.newPassword));

  const storeResult = await storeAccounts();

  if (storeResult) {
    return 'done';
  }

  return 'failed';
};

export default changeMasterPassword;
