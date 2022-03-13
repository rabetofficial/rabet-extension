import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import { Tab } from 'popup/models';
import PrivateKey, { FormValues } from 'popup/components/PrivateKey';
import ImportBackupFile from './ImportBackupFile';

type TabListProps = {
  onCancelPrivateKey: () => void;
  onSubmitPrivateKey: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancelBackup: () => void;
  onSubmitBackup: () => void;
  isModal?: boolean;
  isExtension?: boolean;
};

const TabList = ({
  isModal,
  isExtension,
  onCancelBackup,
  onSubmitBackup,
  onCancelPrivateKey,
  onSubmitPrivateKey,
}: TabListProps) => {
  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Private key',
      content: (
        <PrivateKey
          onCancel={onCancelPrivateKey}
          onSubmit={onSubmitPrivateKey}
          isModal={isModal}
          isExtension={isExtension}
        />
      ),
    },
    {
      id: '2',
      title: 'Backup file',
      content: (
        <ImportBackupFile
          isModal={isModal}
          onCancel={onCancelBackup}
          onSubmit={onSubmitBackup}
          isExtension={isExtension}
        />
      ),
    },
  ];

  return <Tabs data={tabs} isEqualWidth />;
};

TabList.defaultProps = {
  isModal: false,
  isExtension: false,
};

export default TabList;
