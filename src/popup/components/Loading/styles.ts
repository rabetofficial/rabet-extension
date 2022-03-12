import styled from 'styled-components';

export const Container = styled.div`
  padding: 60px 144px 75px;
  @media (max-width: 360px) {
    padding: 32px;
  }
`;

export const Loading = styled.img`
  display: flex;
  margin: 0px auto;
  justify-content: center;
`;

export const Title = styled.div`
  font-size: 16px;
  text-align: center;
  font-weight: 500;
  margin: 13px 0 0 0;
`;
