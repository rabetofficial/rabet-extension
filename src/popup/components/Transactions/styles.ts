import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px 14px 19px;
  ${({ theme }) => theme.colors.primary.lighter};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    transition: 1s background;
  }
`;
export const MainPart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ImgContainer = styled.div`
  margin-right: 14px;
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #f8f8f8;
  border-radius: 50%;
  background-color: #f8f8f8;
`;
export const DateContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 12px;
`;
export const TextContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;
export const Hr = styled.hr`
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;
