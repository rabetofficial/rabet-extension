import store from 'popup/store';
import { changeOperation } from 'popup/reducers/transaction';

export default async (id: string, values: any) => {
  store.dispatch(
    changeOperation({
      id,
      values,
    }),
  );
};
