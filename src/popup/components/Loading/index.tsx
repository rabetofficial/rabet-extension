import React from 'react';

// import loading from 'src/assets/images/loading.svg';
import Spinner from '../Spinner';

import * as S from './styles';

type AppProps = {
  title?: string;
  size: number;
  titleStyle?: string;
};

const Loading = ({ title, size, titleStyle }: AppProps) => (
  <>
    <S.Container>
      <S.Loading>
        <Spinner height={size} width={size} />
      </S.Loading>
      {/* <S.Loading
        src={loading}
        alt="loading"
        style={{ width: `${size}px`, height: `${size}px` }}
      /> */}
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
};

export default Loading;
