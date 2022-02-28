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

  @media (max-width: 360px) {
    margin: 17px auto 0;
    width: 275px;
    height: 318px;
  }
`;

export const MbButton = styled.div`
  padding: 0 17px;
  margin-top: 48px;
  @media (max-width: 360px) {
    padding: 0;
    margin-top: 33px;
  }
`;
export const WelcomeText = styled.p`
  margin-top: 27px;
  @media (max-width: 360px) {
    margin-top: 33px;
    font-size: 14px;
  }
`;
export const MainText = styled.p`
  margin-top: 16px;
  @media (max-width: 360px) {
    margin-top: 7px;
    font-size: 24px;
  }
`;
