import React from 'react';

import closeModalAction from 'popup/actions/modal/close';
import useTypedSelector from 'popup/hooks/useTypedSelector';
import ModalDialog from 'popup/components/common/ModalDialog';

const Modal = () => {
  const modal = useTypedSelector((store) => store.modal);

  return (
    <ModalDialog
      size={modal.size}
      title={modal.title}
      isOpen={modal.isOpen}
      onClose={closeModalAction}
      padding={modal.padding}
      isStyled={modal.isStyled}
      minHeight={modal.minHeight}
    >
      {modal.children}
    </ModalDialog>
  );
};

export default Modal;
