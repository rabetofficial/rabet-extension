import React, { CSSProperties } from 'react';

import { ButtonVariant, ButtonSize } from 'popup/models';

import * as S from './styles';

type ButtonTypes = {
  disabled?: boolean;
  content: React.ReactNode;
  variant: ButtonVariant;
  type?: string | any;
  size?: ButtonSize;
  style?: CSSProperties;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
  className?: string | any;
};

const Button = ({
  reference,
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
}: ButtonTypes) => (
  <S.Button
    ref={reference}
    className={`${className} ${variant} ${size} button`}
    style={style}
    type={type}
    disabled={disabled}
    onClick={onClick}
  >
    {startIcon && (
      <S.BurgerImageStyle style={{ marginRight: '6px' }}>
        {startIcon}
      </S.BurgerImageStyle>
    )}
    {content}
    {endIcon && (
      <S.BurgerImageStyle style={{ marginLeft: '6px' }}>
        {endIcon}
      </S.BurgerImageStyle>
    )}
  </S.Button>
);

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
