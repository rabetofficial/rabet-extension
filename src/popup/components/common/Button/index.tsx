import React, { CSSProperties } from 'react';

import * as S from './styles';

import { ButtonVariant, ButtonSize } from '../../../models';

type ButtonTypes = {
  disabled?: boolean;
  content: JSX.Element | string;
  variant: ButtonVariant;
  type?: string | any;
  size?: ButtonSize;
  style?: CSSProperties;
  startIcon?: JSX.Element | string;
  endIcon?: JSX.Element | string;
  onClick?: () => void;
  className?: string | any;
};

const Button = (props: ButtonTypes) => {
  const {
    type,
    variant,
    size,
    disabled,
    style,
    onClick,
    className,
    content,
    startIcon,
    endIcon,
  } = props;

  return (
    <S.Button
      className={`${className} ${variant} ${size} button`}
      style={style}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      <S.Icon>{startIcon}</S.Icon>
      {content}
      <S.Icon>{endIcon}</S.Icon>
    </S.Button>
  );
};

Button.defaultProps = {
  disabled: false,
  onClick: () => {},
  style: {},
  type: 'button',
  size: '',
  className: '',
  startIcon: '',
  endIcon: '',
};

export default Button;
