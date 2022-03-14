import React from 'react';

import * as S from './styles';

type AppProps = {
  children: React.ReactNode;
  isVertical?: boolean;
  isHorizontal?: boolean;
  isHidden?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  disableOverflow?: boolean;
};

const ScrollBar = ({
  children,
  isVertical,
  isHorizontal,
  isHidden,
  maxWidth,
  maxHeight,
  disableOverflow,
}: AppProps) => {
  if (isVertical) {
    return (
      <S.VerticalScroll
        maxHeight={maxHeight}
        disableOverflow={disableOverflow}
      >
        {children}
      </S.VerticalScroll>
    );
  }

  if (isHorizontal) {
    return (
      <S.HorizontalScroll
        maxWidth={maxWidth}
        disableOverflow={disableOverflow}
      >
        {children}
      </S.HorizontalScroll>
    );
  }

  if (isHidden) {
    return (
      <S.HiddenScroll
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        disableOverflow={disableOverflow}
      >
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
  disableOverflow: false,
};

export default ScrollBar;
