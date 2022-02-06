import styled from 'styled-components';

export const Container = styled.div`
  padding: 23px 54px 65px 54px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  min-height: 100vh;
  height: 100%;
`;

export const Card = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rounded.main};
  padding-right: 20px;
  padding-left: 20px;
`;
