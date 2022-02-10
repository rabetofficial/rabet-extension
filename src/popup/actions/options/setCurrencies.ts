import toCurrencies from '../../utils/horizon/toCurrencies';
import { load } from '../../reducers/currencies';

export default async (): Promise<void> => {
  const currencies = await toCurrencies();

  load(currencies);
};
