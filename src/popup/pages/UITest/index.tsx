import React, { useState } from 'react';

import ModalDialog from '../../components/common/ModalDialog';
import ExpandLayout from '../../components/common/Layouts/ExpandLayout';

const UITest = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  return (
    <ExpandLayout>
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
