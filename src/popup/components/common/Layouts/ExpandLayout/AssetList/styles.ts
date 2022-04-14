import styled from 'styled-components';

export const Container = styled.div`
  padding: 18px 16px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    transition: 1s background-color;
  }
`;

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  min-width: 44px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 3px;
`;
interface ImageProps {
  isDark: boolean;
  theme: any;
}
export const Image = styled.img<ImageProps>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const Hr = styled.div`
  height: 1px;
  margin: 0 16px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;

export const AddAssetBox = styled.div`
  width: 91%;
  height: 40px;
  display: flex;
  margin: 0 16px 2px;
  font-size: 14px;
  border-radius: 2px;
  justify-content: center;
  background-color: white;
  border: 1.2px solid ${({ theme }) => theme.colors.primary.lighter};
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    transition: 1s background-color;
  }
`;
