import store from 'popup/store';
import { OpType, addOperation } from 'popup/reducers/transaction';

export default async (op: OpType) => {
  store.dispatch(addOperation(op));
};
