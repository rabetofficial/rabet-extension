import { Horizon } from 'stellar-sdk';

const RBT: Horizon.BalanceLineAsset<'credit_alphanum4'> = {
  asset_code: 'RBT',
  asset_issuer:
    'GCMSCRWZ3QBOI6AF75B5ZWDBXOSMIRW4FSBZH5OI65Y4H4GVH7LPSOYS',
  balance: '0',
  limit: '999999999',
  asset_type: 'credit_alphanum4',
  buying_liabilities: '0',
  selling_liabilities: '0',
  last_modified_ledger: 123456,
  is_authorized: true,
  is_authorized_to_maintain_liabilities: true,
  is_clawback_enabled: true,
  domain: 'rabet.io',
  logo: 'https://i.ibb.co/1vm036j/Rabet-Token-logo.png',
};

export default RBT;
