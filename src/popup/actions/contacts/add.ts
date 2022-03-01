import store from 'popup/store';
import { add, Contact } from 'popup/reducers/contacts';

import storeContacts from './store';

const addContactAction = (contact: Contact) => {
  store.dispatch(add(contact));

  storeContacts();
};

export default addContactAction;
