import React, { useState, useRef } from 'react';

import ExpandLayout from '../../components/common/Layouts/ExpandLayout';
import { Tab } from '../../models';

const UITest = () => {
  const tabs: Tab[] = [
    {
      id: '1',
      title: 'Assets',
      content: '1',
    },
    {
      id: '2',
      title: 'Transactions',
      content: '2',
    },
  ];

  return <ExpandLayout tabItems={tabs} />;
};

export default UITest;
