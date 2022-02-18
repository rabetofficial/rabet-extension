/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Bid {
  price: string;
  counter: {
    asset_code: string;
    asset_issuer: string;
  };
}

const initialState: Bid[] = [];

const bidsSlice = createSlice({
  name: 'bids',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Bid[]>) => action.payload,
  },
});

export const { load } = bidsSlice.actions;
export default bidsSlice.reducer;
