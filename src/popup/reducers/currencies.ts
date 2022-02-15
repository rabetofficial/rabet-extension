/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CurrencyField = {
  title: string;
  symbol: string;
  name: string;
  price?: number;
};

export type Currencies = {
  USD?: CurrencyField;
  EUR?: CurrencyField;
  JPY?: CurrencyField;
  GBP?: CurrencyField;
  AUD?: CurrencyField;
  CAD?: CurrencyField;
  RUB?: CurrencyField;
  CNY?: CurrencyField;
};

const initialState: Currencies = {};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Currencies>) =>
      action.payload,
  },
});

export const { load } = currenciesSlice.actions;
export default currenciesSlice.reducer;
