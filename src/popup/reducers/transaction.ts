/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Memo {
  text: string;
  checked: boolean;
}

interface Operation {
  id: string;
  type: string;
  values?: {};
  errors?: {};
}

interface ITransaction {
  memo: Memo;
  operations: Operation[];
}

const initialState: ITransaction = {
  memo: {
    text: '',
    checked: true,
  },
  operations: [],
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addOperation: (state, action: PayloadAction<Operation>) => {
      state.operations.push(action.payload);
    },
    removeOperation: (state, action: PayloadAction<string>) => {
      state.operations = state.operations.filter(
        (x) => x.id !== action.payload,
      );
    },
    changeOperation: (
      state,
      action: PayloadAction<{ id: string; values: any }>,
    ) => {
      for (let i = 0; i < state.operations.length; i += 1) {
        if (state.operations[i].id === action.payload.id) {
          state.operations[i] = {
            ...state.operations[i],
            ...action.payload.values,
          };

          break;
        }
      }
    },
    clearOperations: (state) => {
      state.operations = [];
    },
    clearMemo: (state) => {
      state.memo = {
        text: '',
        checked: false,
      };
    },
    addMemo: (state, action: PayloadAction<Memo>) => {
      state.memo = action.payload;
    },
  },
});

export const {
  addOperation,
  removeOperation,
  changeOperation,
  clearOperations,
  addMemo,
  clearMemo,
} = transactionSlice.actions;
export default transactionSlice.reducer;
