import styled from 'styled-components';

export const InfoTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  font-size: 16px;
  margin-bottom: 3px;
`;

export const Info = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  display: inline-flex;
  align-items: center;
`;

export const Type = styled.div`
  margin-left: 6px;
  font-size: 18px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  display: inline-flex;
  align-items: center;
`;

export const Note = styled.div`
  margin-top: 24px;
  height: 48px;
  padding: 11px 15px;
  border-radius: 3px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Text = styled.p`
  font-size: 14px;
  white-space: nowrap;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.63;
  letter-spacing: normal;
  text-align: center;
`;
