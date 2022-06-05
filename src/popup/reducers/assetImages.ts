/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AssetImage {
  asset_code: string;
  asset_issuer: string;
  logo: string;
  domain: string;
  is_verified: boolean;
  trustline: number;
  description: string;
}

export interface AssetImageWithActive extends AssetImage {
  active: boolean;
}

const initialState: AssetImage[] = [];

const assetImagesSlice = createSlice({
  name: 'assetImages',
  initialState,
  reducers: {
    load: (_, action: PayloadAction<AssetImage[]>) => action.payload,
  },
});

export const { load } = assetImagesSlice.actions;
export default assetImagesSlice.reducer;
