import styled from 'styled-components';

export const Box = styled.div`
  margin-top: 6px;
  padding: 10px 4px 4px 12px;
  border-radius: 2px;
  line-height: 1.63;
  font-size: 16px;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2px;
`;

export const Label = styled.div`
  font-size: 16px;
  margin: 20px 0 6px 0;
  font-weight: 500;
  @media (max-width: 360px) {
    margin-top: 22px;
  }
`;

export const Copy = styled.div`
  display: block;
  width: fit-content;
  margin: 0px 0 0px auto;
`;
