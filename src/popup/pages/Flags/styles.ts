import styled from 'styled-components';

export const Content = styled.div`
  padding: 20px 16px 0px;
`;

export const Ttile = styled.h6`
  margin: 8px 0 -20px 0;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 26px;
`;

export const First = styled.div`
  margin-top: 32px !important;
`;
export const ErrorBox = styled.div`
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  padding: 8px 12px 8px 14px;
  border-radius: 2px;
  border: solid 1px #fbeded;
  background-color: #fff4f4;
  color: #ce3d3d;
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
