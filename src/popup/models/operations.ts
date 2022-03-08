import { Horizon } from 'stellar-sdk';

export type SendValues = {
  asset: Horizon.BalanceLine;
  isAccountNew: boolean;
  amount: string;
  destination: string;
  memo: string;
};
