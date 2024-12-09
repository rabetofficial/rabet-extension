import { Horizon } from '@stellar/stellar-sdk';

const LSP: Horizon.HorizonApi.BalanceLineAsset<'credit_alphanum4'> = {
  asset_code: 'LSP',
  asset_issuer:
    'GAB7STHVD5BDH3EEYXPI3OM7PCS4V443PYB5FNT6CFGJVPDLMKDM24WK',
  balance: '0',
  limit: '999999999',
  asset_type: 'credit_alphanum4',
  buying_liabilities: '0',
  selling_liabilities: '0',
  last_modified_ledger: 123456,
  is_authorized: true,
  is_authorized_to_maintain_liabilities: true,
  is_clawback_enabled: true,
  // @ts-ignore
  domain: 'lumenswap.io',
  logo: 'https://lumenswap.io/t/Lumenswap144.png',
};

export default LSP;
