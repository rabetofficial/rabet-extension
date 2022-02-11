import { removeOperation } from 'popup/reducers/transaction';

export default async (id: string) => {
  removeOperation(id);
};
