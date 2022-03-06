import React from 'react';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
  isVertical?: boolean;
  isHorizontal?: boolean;
  isHidden?: boolean;
  maxWidth?: number;
  maxHeight?: number;
};

const ScrollBar = ({
  children,
  isVertical,
  isHorizontal,
  isHidden,
  maxWidth,
  maxHeight,
}: AppProps) => {
  if (isVertical) {
    return (
      <S.VerticalScroll maxHeight={maxHeight}>
        {children}
      </S.VerticalScroll>
    );
  }

  if (isHorizontal) {
    return (
      <S.HorizontalScroll maxWidth={maxWidth}>
        {children}
      </S.HorizontalScroll>
    );
  }

  if (isHidden) {
    return (
      <S.HiddenScroll maxHeight={maxHeight} maxWidth={maxWidth}>
        {children}
      </S.HiddenScroll>
    );
  }

  return <div>children</div>;
};

ScrollBar.defaultProps = {
  isVertical: false,
  isHorizontal: false,
  isHidden: false,
  maxWidth: 0,
  maxHeight: 0,
};

export default ScrollBar;
