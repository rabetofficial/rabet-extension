import React from 'react';

import Tabs from 'popup/components/Tabs';
import PrivateKey, {
  FormValues,
} from 'popup/pageComponents/PrivateKey';
import ImportBackupFile from 'popup/pageComponents/ImportBackupFile';

type TabListType = {
  onCancelPrivateKey: () => void;
  onSubmitPrivateKey: (v: FormValues) => Promise<Partial<FormValues>>;
};

const TabList = ({
  onCancelPrivateKey,
  onSubmitPrivateKey,
}: TabListType) => {
  const tabs = [
    {
      id: '1',
      tabTitle: 'Private key',
      tabContent: (
        <PrivateKey
          onCancel={onCancelPrivateKey}
          onSubmit={onSubmitPrivateKey}
        />
      ),
    },
    {
      id: '2',
      tabTitle: 'Backup file',
      tabContent: <ImportBackupFile />,
    },
  ];

  return <Tabs data={tabs} tabTitleStyle={{ fontWeight: 'bold' }} />;
};

export default TabList;
