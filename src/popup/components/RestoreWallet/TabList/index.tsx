import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import { Tab, Usage } from 'popup/models';
import PrivateKey, { FormValues } from 'popup/components/PrivateKey';
import ImportBackupFile from './ImportBackupFile';

type TabListProps = {
  onCancelPrivateKey: () => void;
  onSubmitPrivateKey: (v: FormValues) => Promise<Partial<FormValues>>;
  onCancelBackup: () => void;
  onSubmitBackup: () => void;
  isModal?: boolean;
  usage: Usage;
};

const TabList = ({
  isModal,
  usage,
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
          usage={usage}
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
          usage={usage}
        />
      ),
    },
  ];

  return <Tabs data={tabs} isEqualWidth />;
};

TabList.defaultProps = {
  isModal: false,
};

export default TabList;
