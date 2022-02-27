import styled from 'styled-components';

export const Container = styled.div`
  cursor: pointer;
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
  margin-right: 12px;
`;
interface ImageProps {
  isDark: boolean;
  theme: any;
}
export const Image = styled.img<ImageProps>`
  width: 31px;
  height: auto;
  border-radius: 50%;
  background-color: ${({ theme, isDark }) =>
    isDark ? theme.colors.primary.darkest : 'auto'};
`;

export const Border = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.primary.lighter};
  }
`;
