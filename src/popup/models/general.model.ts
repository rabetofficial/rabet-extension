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

export type FullPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end';

export type ElementOption = {
  value: string | number;
  label: string | React.ReactNode;
};

export type Tab = {
  id: number | string;
  title: string;
  content: ReactNode;
};

export type Usage = 'desktop' | 'extension';
