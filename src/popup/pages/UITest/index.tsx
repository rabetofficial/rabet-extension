import React, { useState } from 'react';

import Modal from '../../components/common/Modal';

const UITest = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <button type="button" onClick={() => setIsModalOpen(true)}>button</button>
      <Modal
        id="modal"
        title="test"
        isOpen={isModalOpen}
        onClose={toggleModal}
        size="lg"
      >
        test
      </Modal>
    </div>
  );
};

export default UITest;
