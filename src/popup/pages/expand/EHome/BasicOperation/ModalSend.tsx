import React from 'react';

import Modal from 'popup/components/common/ModalDialog';
import BasicConfirmSend from 'popup/blocks/Op/Basic/Confirm/Send';

type AppProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSend = ({ isOpen, onClose }: AppProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isStyled={false}
    size="medium"
  >
    <div className="px-8 pt-8 pb-[14px] min-h-[490px]">
      <BasicConfirmSend usage="desktop" />
    </div>
  </Modal>
);

export default ModalSend;
