import { Horizon } from '@stellar/stellar-sdk';

export type SendValues = {
  asset: Horizon.HorizonApi.BalanceLine;
  isAccountNew: boolean;
  amount: string;
  destination: string;
  memo: string;
};
