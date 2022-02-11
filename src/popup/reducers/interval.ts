/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const intervalSlice = createSlice({
  name: 'interval',
  initialState: {
    value: 0,
  },
  reducers: {
    start: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
    stop: (state) => {
      state.value = 0;
    },
  },
});

export const { start, stop } = intervalSlice.actions;
export default intervalSlice.reducer;
