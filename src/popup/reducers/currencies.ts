/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Currency {
  currency: string;
  value: number;
}

const initialState: Currency[] = [];

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Currency[]>) => {
      state = action.payload;
    },
  },
});

export const { load } = currenciesSlice.actions;
export default currenciesSlice.reducer;
