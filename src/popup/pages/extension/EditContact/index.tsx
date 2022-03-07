import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import ExtTitle from 'popup/components/common/Title/Ext';
import EditContactComponent from 'popup/blocks/Setting/Contacts/EditContact';

const EditContact = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleClose = () => {
    navigate(RouteName.Setting, {
      state: {
        defaultPage: '4',
      },
    });
  };

  return (
    <div>
      <Header />

      <EditContactComponent
        onClose={handleClose}
        contact={state.contact}
        titlePage={false}
      >
        <ExtTitle title="Edit Contact" onClose={handleClose} />
      </EditContactComponent>
    </div>
  );
};

export default EditContact;
