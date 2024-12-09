import { Horizon } from '@stellar/stellar-sdk';

const USDC: Horizon.HorizonApi.BalanceLineAsset<'credit_alphanum4'> =
  {
    asset_code: 'USDC',
    asset_issuer:
      'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN',
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
    domain: 'centre.io',
    logo: 'https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png',
  };

export default USDC;
