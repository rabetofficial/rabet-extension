import { IOption } from 'popup/reducers/options';
import { Currencies } from 'popup/reducers/currencies';

const handleAssetSymbol = (
  currencies: Currencies,
  options: IOption,
) => {
  const currency = options.currency || 'USD';

  return currencies[currency]?.symbol || '$';
};

export default handleAssetSymbol;
