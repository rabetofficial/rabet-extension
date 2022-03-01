import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  name: string;
  publicKey: string;
  memo?: string;
}

const initialState: Contact[] = [];

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    load: (state, action: PayloadAction<Contact[]>) => action.payload,
    add: (state, action: PayloadAction<Contact>) => {
      state.push(action.payload);
    },
    deleteOne: (state, action: PayloadAction<Contact>) =>
      state.filter(
        (contact) => contact.publicKey !== action.payload.publicKey,
      ),
  },
});

export const { add, load, deleteOne } = contactsSlice.actions;
export default contactsSlice.reducer;
