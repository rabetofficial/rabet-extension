import styled from 'styled-components';

export const Scan = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScanText = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary.dark};
`;
