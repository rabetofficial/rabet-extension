import styled from 'styled-components';

export const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  margin-bottom: 16px;
`;

export const AccountTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Label = styled.div`
  font-size: 16px;
  line-height: 1.63;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Value = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: black;
  display: flex;
  align-items: center;
  margin-top: 2px;
`;

export const Image = styled.img`
  width: 25px !important;
  height: 25px !important;
  border-radius: 50%;
  margin: 0 2px 0 6px;
`;
export const img = styled.div`
  width: 18px !important;
  height: 18px !important;
  border-radius: 50%;
  margin: 0 2px 0 6px;
`;
export const Hr = styled.div`
  border: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.primary.lighter};
  margin: 12px 0;
`;
