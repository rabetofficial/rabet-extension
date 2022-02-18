import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 19px 0px 22px;
  padding-bottom: 14px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.primary.lighter};
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
  margin-right: 57px;
`;
export const TextContainer = styled.div`
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
`;
