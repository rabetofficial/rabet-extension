import React, { useState, useRef } from 'react';
import Modal from 'react-modal';

import ExpandLayout from '../../components/common/Layouts/ExpandLayout';
import ScrollBar from '../../components/common/ScrollBar';

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
      <ScrollBar isHidden maxWidth={40}>
        <div
          style={{
            width: '50px',
            background: 'blue',
            margin: '5px',
          }}
        >
          test
        </div>
        <div
          style={{
            width: '50px',
            background: 'blue',
            margin: '5px',
          }}
        >
          test
        </div>
        <div
          style={{
            width: '50px',
            background: 'blue',
            margin: '5px',
          }}
        >
          test
        </div>
      </ScrollBar>
    </ExpandLayout>
  );
};

export default UITest;
