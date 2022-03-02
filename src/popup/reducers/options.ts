/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OptionMode = 'BASIC' | 'ADVANCED';
export type Network = 'MAINNET' | 'TESTNET';

export interface IOption {
  network: Network;
  explorer: string;
  currency: string;
  privacyMode: boolean;
  autoTimeLocker: number;
  mode: OptionMode;
}

const initialState: IOption = {
  privacyMode: true,
  explorer: 'steexp',
  network: 'MAINNET',
  autoTimeLocker: 60,
  currency: 'USD',
  mode: 'BASIC',
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Partial<IOption>>) => ({
      ...state,
      ...action.payload,
    }),
    fixUsd: (state) => {
      if (state.currency === 'usd') {
        state.currency = 'USD';
      }
    },
    load: (state, action: PayloadAction<Partial<IOption>>) => ({
      ...state,
      ...action.payload,
    }),
    changeNetwork: (state, action: PayloadAction<Network>) => {
      state.network = action.payload;
    },
    changeMode: (state, action: PayloadAction<OptionMode>) => {
      state.mode = action.payload;
    },
  },
});

export const { change, fixUsd, load, changeNetwork, changeMode } =
  optionSlice.actions;
export default optionSlice.reducer;
