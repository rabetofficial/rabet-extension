import React from 'react';
import CreateContact from 'popup/blocks/Setting/Contacts/CreateContact';

const AddContact = () => {
  console.log('hi');

  return (
    <div>
      <ExtTitle title="Add Contact" />
      <CreateContact />
    </div>
  );
};

export default AddContact;
