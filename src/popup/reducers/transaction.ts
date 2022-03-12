/* eslint-disable no-param-reassign */
import { Horizon } from 'stellar-sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Memo {
  text: string;
  checked: boolean;
}

export type OpType = {
  id: string;
  checked: boolean;
  type: Horizon.OperationResponseType;
};

// interface Operation {
//   id: string;
//   type: string;
//   values?: {};
//   errors?: {};
// }

interface ITransaction {
  memo: Memo;
  operations: OpType[];
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
    addOperation: (state, action: PayloadAction<OpType>) => {
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
  addMemo,
  clearMemo,
  addOperation,
  removeOperation,
  changeOperation,
  clearOperations,
} = transactionSlice.actions;
export default transactionSlice.reducer;
