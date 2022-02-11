/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AssetImage } from './assetImages';

import matchAsset from '../utils/matchAsset';

export type AssetTypes =
  | 'native'
  | 'credit_alphanum4'
  | 'credit_alphanum12';

export interface Balance {
  balance: string;
  buying_liabilities: string;
  selling_liabilities: string;
  asset_type: AssetTypes;

  asset_code?: string;
  asset_issuer?: string;
  last_modified_ledger?: string;
  limit?: string;
  is_authorized?: boolean;
  is_authorized_to_maintain_liabilities?: boolean;

  logo?: string;
  domain?: string;
  toNative?: number;
}

export interface Flags {
  auth_required: boolean;
  auth_revocable: boolean;
  auth_immutable: boolean;
  auth_clawback_enabled: boolean;
}

export interface Thresholds {
  low_threshold: number;
  med_threshold: number;
  high_threshold: number;
}

export interface IAccount {
  name: string;
  publicKey: string;
  privateKey: string;
  active?: boolean;
  balance: number;
  flags?: Flags;
  thresholds?: Thresholds;
  balances?: Balance[];
  subentry_count?: number;
  isConnected?: boolean;
  maxXLM?: number;
  toNativeLoaded?: boolean;
}

const initialState: IAccount[] = [];

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<IAccount>) => {
      state.push(action.payload);
    },
    load: (state, action: PayloadAction<IAccount[]>) => {
      state = action.payload;
    },
    remove: (state, action: PayloadAction<string>) => {
      state = state.filter((x) => x.publicKey !== action.payload);
    },
    changeName: (
      state,
      action: PayloadAction<{ publicKey: string; name: string }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].name = action.payload.name;
          state[i].active = true;
        }
      }
    },
    changeActive: (
      state,
      action: PayloadAction<{ publicKey: string }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].active = true;
        } else {
          state[i].active = false;
        }
      }
    },
    changeData: (state, action: PayloadAction<Partial<IAccount>>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i] = {
            ...state[i],
            ...action.payload,
          };
        }
      }
    },
    updateBalance: (
      state,
      action: PayloadAction<{ publicKey: string; balance: number }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].balance = action.payload.balance;
        }
      }
    },
    addAssetImages: (
      state,
      action: PayloadAction<{
        publicKey: string;
        assetImages: AssetImage[];
      }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          const balances = state[i].balances || [];
          for (let j = 0; j < balances.length; j += 1) {
            const asset = balances[j];
            const assetImage = action.payload.assetImages.find((x) =>
              matchAsset(x, asset),
            );

            balances[j].logo = assetImage?.logo;
            balances[j].domain = assetImage?.domain;
          }
        }
      }
    },
    changeIsConnected: (
      state,
      action: PayloadAction<{
        publicKey: string;
        isConnected: boolean;
      }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].isConnected = action.payload.isConnected;
        }
      }
    },
    toNativePrices: (
      state,
      action: PayloadAction<{ publicKey: string; prices: [] }>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          const balances = state[i].balances || [];

          state[i].balances = balances.map((x) => {
            const findNative = action.payload.prices.find((y) =>
              matchAsset(y, x),
            );

            return {
              ...x,
              toNative: findNative?.toNative,
            };
          });

          state[i].toNativeLoaded = true;
        }
      }
    },
  },
});

export const {
  add,
  load,
  remove,
  changeName,
  changeActive,
  changeData,
  updateBalance,
  addAssetImages,
  changeIsConnected,
  toNativePrices,
} = accountsSlice.actions;
export default accountsSlice.reducer;
