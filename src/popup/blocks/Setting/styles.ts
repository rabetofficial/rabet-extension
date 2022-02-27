import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  padding: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    transition: 1s background;
  }
`;

export const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 14px;
`;

export const Hr = styled.hr`
  margin: 17px 0 15px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;
