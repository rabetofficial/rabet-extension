import React from 'react';
import { useNavigate } from 'react-router-dom';

import RouteName from 'popup/staticRes/routes';
import Header from 'popup/components/common/Header';
import CreateContact from 'popup/blocks/Setting/Contacts/CreateContact';
import ExtTitle from 'popup/components/common/Title/Ext';

const AddContact = () => {
  const navigate = useNavigate();

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

      <CreateContact onClose={handleClose} titlePage={false}>
        <ExtTitle title="Create Contact" onClose={handleClose} />
      </CreateContact>
    </div>
  );
};

export default AddContact;
