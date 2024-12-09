import { Horizon } from '@stellar/stellar-sdk';

const YBX: Horizon.HorizonApi.BalanceLineAsset<'credit_alphanum4'> = {
  asset_code: 'YBX',
  asset_issuer:
    'GBUYYBXWCLT2MOSSHRFCKMEDFOVSCAXNIEW424GLN666OEXHAAWBDYMX',
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
  domain: 'script3.io',
  logo: 'https://uploads-ssl.webflow.com/607f603d2f412c67690368b8/60df683719cc056004ea932b_YBX%20token%20web%20bad.png',
};

export default YBX;
