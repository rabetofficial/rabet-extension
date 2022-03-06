import React from 'react';

import Modal from 'popup/components/common/ModalDialog';
import BasicConfirmSwap from 'popup/blocks/Op/Basic/Confirm/Swap';

type AppProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalSwap = ({ isOpen, onClose }: AppProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isStyled={false}
    size="medium"
  >
    <div className="px-8 pt-8 pb-[14px] min-h-[534px]">
      <BasicConfirmSwap usage="desktop" />
    </div>
  </Modal>
);

export default ModalSwap;
