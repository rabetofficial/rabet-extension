import styled from 'styled-components';

export const Content = styled.div`
  padding-top: 24px;
`;

export const Ttile = styled.h6`
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  margin: 0 0 -20px 0;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Div = styled.div`
  align-items: center;
  justify-content: space-between;
  margin-top: 29px;
`;

export const First = styled.div`
  margin-top: 32px !important;
`;

export const ToggleTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: @shark;

  .icon-question-mark {
    color: #b1b1b1;
    margin-left: 4px;
    cursor: pointer;
  }
`;
