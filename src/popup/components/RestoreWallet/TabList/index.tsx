import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import { Tab } from 'popup/models';
import PrivateKey, { FormValues } from 'popup/components/PrivateKey';
import ImportBackupFile from './ImportBackupFile';

type TabListType = {
  onCancelPrivateKey: () => void;
  onSubmitPrivateKey: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
  isExtension?: boolean;
};

const TabList = ({
  onCancelPrivateKey,
  onSubmitPrivateKey,
  isModal,
  isExtension,
}: TabListType) => {
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
