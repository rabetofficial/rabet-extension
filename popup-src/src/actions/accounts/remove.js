import store from 'Root/store';
import types from '../../actions';
import changeActive from './changeActive';
import storeAccount from './store';
import * as route from 'Root/staticRes/routes';

const removeAccount = async (publicKey, push) => {
    store.dispatch({
        type: types.accounts.REMOVE,
        publicKey,
    });

    const { accounts } = store.getState();

    if (accounts.length) {
        changeActive(accounts[0].publicKey);
    } else {
        push(route.firstPage);

        await storeAccount();
    }
};

export default removeAccount;