import { Horizon } from 'stellar-sdk';

const AQUA: Horizon.BalanceLineAsset<'credit_alphanum4'> = {
  asset_code: 'AQUA',
  asset_issuer:
    'GBNZILSTVQZ4R7IKQDGHYGY2QXL5QOFJYQMXPKWRRM5PAV7Y4M67AQUA',
  balance: '0',
  limit: '999999999',
  asset_type: 'credit_alphanum4',
  buying_liabilities: '0',
  selling_liabilities: '0',
  last_modified_ledger: 123456,
  is_authorized: true,
  is_authorized_to_maintain_liabilities: true,
  is_clawback_enabled: true,
  domain: 'aqua.network',
  logo: 'https://i.imgur.com/HZzCN0H.png',
};

export default AQUA;
