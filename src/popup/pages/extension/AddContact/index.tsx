import React from 'react';

import Header from 'popup/components/common/Header';
import CreateContact from 'popup/blocks/Setting/Contacts/CreateContact';

const AddContact = () => {
  console.log('hi');

  return (
    <div>
      <Header />
      <CreateContact onClose={() => console.log('shit')} />
    </div>
  );
};

export default AddContact;
