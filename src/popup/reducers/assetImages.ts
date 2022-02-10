/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssetImage {
  asset_code: string;
  asset_issuer: string;
  logo: string;
  domain: string;
}

const initialState: AssetImage[] = [];

const assetImagesSlice = createSlice({
  name: 'assetImages',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<AssetImage[]>) => {
      state = action.payload;
    },
  },
});

export const { load } = assetImagesSlice.actions;
export default assetImagesSlice.reducer;
