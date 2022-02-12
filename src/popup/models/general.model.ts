import React, { ReactNode } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'default'
  | 'outlined';

export type ButtonSize = 'small' | 'medium' | 'large';

export type InputVariant = 'password' | 'max';

export type InputSize = 'small' | 'medium' | 'large';

export type ModalSize = 'small' | 'medium' | 'large';

export type JustifyContent = 'start' | 'end' | 'center';

export type Placement = 'top' | 'bottom' | 'right' | 'left';

export type ElementOption = {
  value: string;
  label: string | React.ReactNode;
};

export type Tab = {
  id: number | string;
  title: string;
  content: ReactNode;
};
