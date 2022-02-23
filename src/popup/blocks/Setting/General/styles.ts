import styled from 'styled-components';

export const Select = styled.div`
  text-align: left;
  display: flex;
  justify-content: flex-end;

  .ops__control {
    width: 134px !important;
  }

  .ops__indicator svg {
    color: ${({ theme }) => theme.colors.primary.main} !important;
  }
`;

export const Version = styled.p`
  font-size: 16px;
  position: absolute;
  bottom: 20px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-bottom: 0;
  width: 100%;
  text-align: center;
`;
