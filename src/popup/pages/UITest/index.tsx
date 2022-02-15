import React, { useState, useRef } from 'react';
import Modal from 'react-modal';

import ExpandLayout from '../../components/common/Layouts/ExpandLayout';
import { Tab } from '../../models';
import QRCode from '../../Blocks/QRCode';
import ModalDialog from '../../components/common/ModalDialog';

const UITest = () => {
  const [modal, setModal] = useState(false);
  const onOpenModal = () => setModal(true);
  const onCloseModal = () => setModal(false);

  return (
    <ExpandLayout>
      {/* <div className="p-4" onClick={onOpenModal}> */}
      {/*  test */}
      {/* </div> */}
      {/* <ModalDialog */}
      {/*  title="Receive" */}
      {/*  size="medium" */}
      {/*  padding="large" */}
      {/*  onClose={onCloseModal} */}
      {/*  isOpen={modal} */}
      {/* > */}
      {/*  test */}
      {/* </ModalDialog> */}
      <button onClick={onOpenModal}>Open Modal</button>
      <Modal isOpen={modal} onRequestClose={onCloseModal}>
        <button onClick={onCloseModal}>close</button>
        <div>I am a modal</div>
      </Modal>
      <p>i'm here</p>
    </ExpandLayout>
  );
};

export default UITest;
