import React from 'react';
import PropTypes from 'prop-types';

import loading from 'src/assets/images/loading.svg';

import * as S from './styles';

type AppProps = {
  title: string;
  size: number;
};

const Loading = ({ title, size }: AppProps) => (
  <S.Container>
    <S.Loading
      src={loading}
      alt="loading"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
    {title && <S.Title>{title}</S.Title>}
  </S.Container>
);

Loading.defaultProps = {
  title: '',
};

Loading.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number.isRequired,
};

export default Loading;
