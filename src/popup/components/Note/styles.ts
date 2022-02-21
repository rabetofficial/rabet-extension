import styled from 'styled-components';

export const Note = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 4px;
  padding: 48px 32px;
  @media (max-width: 360px) {
    padding: 32px 16px;
  } ;
`;

export const Box = styled.div`
  border: solid 1px #ffeac5;
  background-color: #fff5ea;
  border-radius: 4px;
  padding: 10px 14px 10px 16px;
  color: #262728;
  font-size: 16px;
  line-height: 1.5;
  display: flex;
`;

export const Warn = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.notice};
  background-color: #fff5ea;
`;

export const Icon = styled.div`
  margin-right: 4px;
  margin-top: 3px;
`;
