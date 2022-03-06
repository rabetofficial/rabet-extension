import React from 'react';
import { useLocation } from 'react-router-dom';

const EditContact = () => {
  const { state } = useLocation();

  // pass this as a props to EditContact component
  console.log(state.contact);

  return <div>Edit CONTACT</div>;
};

export default EditContact;
