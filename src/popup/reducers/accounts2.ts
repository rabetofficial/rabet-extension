/* eslint-disable no-param-reassign */
import { Horizon } from 'stellar-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAccount {
  name: string;
  active: boolean;
  publicKey: string;
  privateKey: string;
  isConnected: boolean;
  assets?: Horizon.BalanceLine[];
  flags?: Horizon.Flags;
}

type AddBalanceAction = {
  publicKey: string;
  assets: Horizon.BalanceLine[];
};

type AddFlagsAction = {
  publicKey: string;
  flags: Horizon.Flags;
};

type ChangeNameAction = {
  publicKey: string;
  name: string;
};

const initialState: IAccount[] = [];

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<IAccount[]>) =>
      action.payload,
    add: (state, action: PayloadAction<IAccount>) => {
      state.push(action.payload);
    },
    changeActive: (state, action: PayloadAction<string>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload) {
          state[i].active = true;
        } else {
          state[i].active = false;
        }
      }
    },
    addBalances: (state, action: PayloadAction<AddBalanceAction>) => {
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
    changeName: (state, action: PayloadAction<ChangeNameAction>) => {
      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === action.payload.publicKey) {
          state[i].name = action.payload.name;
          state[i].active = true;
        }
      }
    },
  },
});

export const {
  add,
  load,
  changeActive,
  addBalances,
  addFlags,
  changeName,
} = accountsSlice.actions;
export default accountsSlice.reducer;
