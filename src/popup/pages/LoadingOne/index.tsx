import React from 'react';
import styled from 'styled-components';
import Logo from 'popup/components/Logo';
import Loading from 'popup/components/Loading';

const MediaLoading = styled.div`
  margin-top: -40px;
  @media (max-width: 360px) {
    margin-top: -20px;
  }
`;

const LoadingOne = () => (
  <div className="flex justify-center items-center h-screen w-screen">
    <div>
      <Logo />
      <MediaLoading>
        <Loading size={64} />
      </MediaLoading>
    </div>
  </div>
);

export default LoadingOne;
