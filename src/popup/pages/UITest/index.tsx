import React, { useState, useRef } from 'react';

import Popover from 'popup/components/common/Popover';
import Header from '../../components/common/Header';
import ExpandLayout from '../../components/common/Layouts/ExpandLayout';
import ModalDialog from '../../components/common/ModalDialog';

const UITest = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <ExpandLayout>
      <Header />
      <button ref={buttonRef}>Popover</button>
      <Popover placement="bottom" ref={buttonRef}>
        And here's some amazing content. It's very engaging. Right?
      </Popover>
      <hr />
      <button type="button" onClick={handleOpen}>
        open
      </button>
      <ModalDialog
        title="Title"
        isOpen={open}
        onClose={handleClose}
        size="small"
      >
        test
        <button type="button" onClick={handleClose}>
          close
        </button>
      </ModalDialog>
    </ExpandLayout>
  );
};

export default UITest;
