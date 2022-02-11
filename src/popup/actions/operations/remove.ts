import store from 'popup/store';
import { removeOperation } from 'popup/reducers/transaction';

export default async (id: string) => {
  store.dispatch(removeOperation(id));
};
