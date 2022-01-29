import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
// import Modal from 'react-modal';

const ModalDialog = () => {
  const [isOpen, setOpen] = useState(false);
  const modalStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.32)',
    },
  };

  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <div>
      <button onClick={toggleModal}>
        Open Modal
      </button>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dialog"
      >
        <Modal
          appElement={document.getElementById('root') as HTMLElement}
          closeTimeoutMS={500}
          isOpen={isOpen}
          style={modalStyles}
          shouldCloseOnOverlayClick
          onRequestClose={() => setOpen(false)}
        >
          <button onClick={toggleModal}>
            Close Modal
          </button>
          <div>Hello World</div>
        </Modal>
      </CSSTransition>
    </div>
  );
};

export default ModalDialog;
