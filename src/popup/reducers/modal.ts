/* eslint-disable no-param-reassign */
import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ModalSize } from 'popup/models';

export type IModal = {
  title?: string;
  isOpen: boolean;
  size?: ModalSize;
  isStyled?: boolean;
  padding?: 'medium' | 'large';
  minHeight?: number;
  children: React.ReactNode;
};

const initialState: IModal = {
  title: 'Modal',
  size: 'medium',
  padding: 'large',
  isOpen: false,
  children: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => ({
      ...state,
      ...action.payload,
    }),
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
