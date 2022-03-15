/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const hostSlice = createSlice({
  name: 'host',
  initialState: '',
  reducers: {
    change: (state, action: PayloadAction<string>) => action.payload,
  },
});

export const { change } = hostSlice.actions;
export default hostSlice.reducer;
