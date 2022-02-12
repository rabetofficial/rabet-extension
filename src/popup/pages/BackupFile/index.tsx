import React, { useState } from 'react';

import BackupFileComponent from 'popup/pageComponents/BackupFile';
import ModalDialog from 'popup/components/common/ModalDialog';

const BackupFile = () => {
  const [open, setOpen] = useState(false);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModal = () => setOpen(true);

  return (
    <>
      <button type="button" onClick={handleOpenModal}>
        open
      </button>
      <ModalDialog
        title="Backup file"
        size="medium"
        isOpen={open}
        onClose={handleCloseModal}
      >
        <BackupFileComponent />
      </ModalDialog>
    </>
  );
};

export default BackupFile;
