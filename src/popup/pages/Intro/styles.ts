import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 25px;
  white-space: nowrap;
`;

export const Img = styled.div`
  width: 361px;
  height: 417px;
  display: block;
  margin: -13px auto 0 auto;

  @media (max-width: 370px) {
    width: 350px;
    height: 417px;
  }
`;

export const MbButton = styled.div`
  @media (max-width: 360px) {
    margin-bottom: 32px !important;
  }
`;
