/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Contact {
  name: string;
  publicKey: string;
  memo?: string;
}

type EditOnePayload = {
  oldContact: Contact;
  newContact: Contact;
};

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
    editOne: (state, action: PayloadAction<EditOnePayload>) => {
      const { oldContact, newContact } = action.payload;

      for (let i = 0; i < state.length; i += 1) {
        if (state[i].publicKey === oldContact.publicKey) {
          state[i] = newContact;
        }
      }
    },
  },
});

export const { add, load, editOne, deleteOne } =
  contactsSlice.actions;
export default contactsSlice.reducer;
