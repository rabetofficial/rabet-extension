import React from 'react';

import loading from 'src/assets/images/loading.svg';

import * as S from './styles';

type AppProps = {
  title?: string;
  size: number;
  titleStyle?: string;
};

const Loading = ({ title, size, titleStyle }: AppProps) => (
  <S.Container>
    <S.Loading
      src={loading}
      alt="loading"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
    {title && <S.Title className={titleStyle}>{title}</S.Title>}
  </S.Container>
);

Loading.defaultProps = {
  title: '',
  titleStyle: '',
};

export default Loading;
