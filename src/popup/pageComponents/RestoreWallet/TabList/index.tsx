import React from 'react';

import Tabs from 'popup/components/common/Tabs';
import { Tab } from 'popup/models';
import PrivateKey, {
  FormValues,
} from 'popup/pageComponents/PrivateKey';
import ImportBackupFile from 'popup/pageComponents/ImportBackupFile';

type TabListType = {
  onCancelPrivateKey: () => void;
  onSubmitPrivateKey: (v: FormValues) => Promise<Partial<FormValues>>;
  isModal?: boolean;
};

const TabList = ({
  onCancelPrivateKey,
  onSubmitPrivateKey,
  isModal,
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
        />
      ),
    },
    {
      id: '2',
      title: 'Backup file',
      content: <ImportBackupFile isModal={isModal} />,
    },
  ];

  return <Tabs data={tabs} isEqualWidth />;
};

TabList.defaultProps = {
  isModal: false,
};

export default TabList;
