import store from 'popup/store';
import { editOne, Contact } from 'popup/reducers/contacts';

import storeContacts from './store';

const editContactAction = (
  oldContact: Contact,
  newContact: Contact,
) => {
  store.dispatch(
    editOne({
      oldContact,
      newContact,
    }),
  );

  storeContacts();
};

export default editContactAction;
