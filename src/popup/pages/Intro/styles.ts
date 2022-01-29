import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 44px;
  white-space: none;
`;

export const Img = styled.div`
  margin-top: 35px;
  width: 377px;
  height: 351px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 360px) {
    width: 300px;
    height: 280px;
  }
`;

export const MbButton = styled.div`
  @media (max-width: 360px) {
    margin-bottom: 32px !important;
  }
`;
