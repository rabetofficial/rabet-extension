import styled from 'styled-components';

export const Select = styled.div`
  .ops__indicator svg {
    color: ${({ theme }) => theme.colors.primary.main} !important;
  }
`;
export const Hr = styled.hr`
  margin: 15px 0 16px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;
