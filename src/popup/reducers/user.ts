/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  registered: boolean;
  logged: boolean;
  password: string;
  connectedWebsites: string[];
}

const initialState: IUser = {
  password: '',
  logged: false,
  registered: false,
  connectedWebsites: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
      state.logged = true;
    },
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    logout: (state) => {
      state.password = '';
      state.logged = false;
    },
    isRegistered: (state, action: PayloadAction<boolean>) => {
      state.registered = action.payload;
    },
    addConnectedWebsites: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      state.connectedWebsites = action.payload;
    },
    removeConnectedWebsite: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.connectedWebsites = state.connectedWebsites.filter(
        (x) => x !== action.payload,
      );
    },
  },
});

export const {
  login,
  logout,
  isRegistered,
  changePassword,
  addConnectedWebsites,
  removeConnectedWebsite,
} = userSlice.actions;
export default userSlice.reducer;
