import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from 'popup/components/common/Header';
import EditContactComponent from 'popup/blocks/Setting/Contacts/EditContact';

const EditContact = () => {
  const { state } = useLocation();

  // pass this as a props to EditContact component
  console.log(state.contact);

  return (
    <div>
      <Header />
      <EditContactComponent onClose={() => console.log('shit')} />
    </div>
  );
};

export default EditContact;
