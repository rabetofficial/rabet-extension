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
export const MediaButton = styled.div`
  margin-top: 117px;
  margin-bottom: 24px;
  @media (max-width: 360px) {
    margin-top: 32px;
  }
`;
