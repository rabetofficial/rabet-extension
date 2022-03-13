/* eslint-disable no-param-reassign */
import { Horizon } from 'stellar-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAccount {
  name: string;
  active: boolean;
  publicKey: string;
  privateKey: string;
  inactive?: boolean;
  isConnected: boolean;
  subentry_count: number;
  assets?: Horizon.BalanceLine[];
  flags?: Horizon.Flags;
}

type AddAssetsAction = {
  publicKey: string;
  assets: Horizon.BalanceLine[];
};

type AddFlagsAction = {
  publicKey: string;
  flags: Horizon.Flags;
};

type AddSubAction = {
  publicKey: string;
  subentry_count: number;
};

type ChangeNameAction = {
  publicKey: string;
  name: string;
};

type SetInactiveAction = {
  publicKey: string;
  inactive: boolean;
};

const initialState: IAccount[] = [];

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<IAccount[]>) =>
      action.payload,
    loadBackup: (state, action: PayloadAction<IAccount[]>) => {
      for (let i = 0; i < action.payload.length; i += 1) {
        const newAccount = action.payload[i];

        if (
          !state.find(
            (account) => account.publicKey === newAccount.publicKey,
          )
        ) {
          state.push(newAccount);
        }
      }
    },
    add: (state, action: PayloadAction<IAccount>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) =>
      state.filter((x) => x.publicKey !== action.payload),
    changeActive: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload) {
          state[i].active = true;
        } else {
          state[i].active = false;
        }
      }
    },
    addAssets: (state, action: PayloadAction<AddAssetsAction>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].assets = action.payload.assets;
        }
      }
    },
    addFlags: (state, action: PayloadAction<AddFlagsAction>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].flags = action.payload.flags;
        }
      }
    },
    addSubentryCount: (
      state,
      action: PayloadAction<AddSubAction>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].subentry_count = action.payload.subentry_count;
        }
      }
    },
    changeName: (state, action: PayloadAction<ChangeNameAction>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].name = action.payload.name;
          state[i].active = true;
        }
      }
    },
    setInactive: (
      state,
      action: PayloadAction<SetInactiveAction>,
    ) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].inactive = action.payload.inactive;
        }
      }
    },
  },
});

export const {
  add,
  load,
  remove,
  addFlags,
  addAssets,
  loadBackup,
  changeName,
  setInactive,
  changeActive,
  addSubentryCount,
} = accountsSlice.actions;
export default accountsSlice.reducer;
