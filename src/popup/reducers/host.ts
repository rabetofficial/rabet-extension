/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const hostSlice = createSlice({
  name: 'host',
  initialState: {
    value: '',
  },
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { change } = hostSlice.actions;
export default hostSlice.reducer;
