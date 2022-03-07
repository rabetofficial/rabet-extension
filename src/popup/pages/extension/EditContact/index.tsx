import React from 'react';
import { useLocation } from 'react-router-dom';
import EditContactComponent from 'popup/blocks/Setting/Contacts/EditContact';
import ExtTitle from 'popup/components/common/Title/Ext';

const EditContact = () => {
  const { state } = useLocation();

  // pass this as a props to EditContact component
  console.log(state.contact);

  return (
    <div>
      <ExtTitle title="Edit Contact" />
      <EditContactComponent />
    </div>
  );
};

export default EditContact;
