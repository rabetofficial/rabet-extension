/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const intervalSlice = createSlice({
  name: 'interval',
  initialState: 0,
  reducers: {
    start: (state, action: PayloadAction<number>) => {
      state = action.payload;
    },
    stop: (state) => {
      clearInterval(state);
      state = 0;
    },
  },
});

export const { start, stop } = intervalSlice.actions;
export default intervalSlice.reducer;
