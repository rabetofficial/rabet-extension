import store from 'popup/store';
import { deleteOne, Contact } from 'popup/reducers/contacts';

import storeContacts from './store';

const deleteContactAction = (contact: Contact) => {
  store.dispatch(deleteOne(contact));

  storeContacts();
};

export default deleteContactAction;
