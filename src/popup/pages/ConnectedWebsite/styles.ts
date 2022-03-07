import styled from 'styled-components';

export const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-top: 16px;
  margin-bottom: 0;
`;

export const Website = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 26px;
  &:first-child {
    margin-top: 30px;
  }
`;

export const Link = styled.a`
  font-size: 16px;
  font-weight: 500;
  color: 3273ff;
`;

export const Icon = styled.span`
  color: ${({ theme }) => theme.colors.primary.lighter};
  cursor: pointer;
`;
