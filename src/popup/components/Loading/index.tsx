import React from 'react';

import loading from 'src/assets/images/loading.svg';

import * as S from './styles';

type AppProps = {
  title?: string;
  size: number;
  titleStyle?: string;
  className?: string;
};

const Loading = ({
  title,
  size,
  titleStyle,
  className,
}: AppProps) => (
  <>
    <S.Container className={className}>
      <S.Loading
        src={loading}
        alt="loading"
        style={{ width: `${size}px`, height: `${size}px` }}
      />
      {title && (
        <S.Title className={titleStyle}>
          <p>{title}</p>
        </S.Title>
      )}
    </S.Container>
  </>
);

Loading.defaultProps = {
  title: '',
  titleStyle: '',
  className: '',
};

export default Loading;
