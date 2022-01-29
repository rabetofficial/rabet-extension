import React, { useState } from 'react';

import ModalDialog from '../../components/common/ModalDialog';

const UITest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {/* <button type="button" onClick={() => setIsModalOpen(true)}>button</button> */}
      <ModalDialog
        id="modal"
        title="test"
        isOpen={isModalOpen}
        onClose={toggleModal}
        size="lg"
      >
        test
      </ModalDialog>
    </div>
  );
};

export default UITest;
