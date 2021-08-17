import currentActiveAccount from './activeAccount';

export default (code) => {
  const { activeAccount } = currentActiveAccount();

  const { balances } = activeAccount;

  const asset = balances.find((x) => x.asset_code === code);

  return asset.asset_issuer;
};
