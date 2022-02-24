import React from 'react';

import openModalAction from 'popup/actions/modal/open';

export const openCreateWalletModal = (children: React.ReactNode) => {
  openModalAction({
    isStyled: true,
    title: 'Create Wallet',
    size: 'medium',
    padding: 'large',
    minHeight: 0,
    children,
  });
};

export const openImportWalletModal = (children: React.ReactNode) => {
  openModalAction({
    isStyled: true,
    title: 'Import Wallet',
    size: 'medium',
    padding: 'large',
    minHeight: 462,
    children,
  });
};

export const openBackupFileModal = (children: React.ReactNode) => {
  openModalAction({
    isStyled: true,
    title: 'Backup File',
    size: 'medium',
    padding: 'large',
    minHeight: 0,
    children,
  });
};
