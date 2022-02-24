import styled from 'styled-components';

export const Container = styled.div`
  padding: 0;
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
`;
export const Description = styled.p`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 14px;
`;
