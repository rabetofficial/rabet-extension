import { changeOperation } from 'popup/reducers/transaction';

export default async (id: string, values: any) => {
  changeOperation({
    id,
    values,
  });
};
