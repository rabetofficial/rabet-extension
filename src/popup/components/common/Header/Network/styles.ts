import styled from 'styled-components';

type ContainerType = {
  isMain: boolean;
  drop: 'dark' | 'light';
};

const Container = styled.div.attrs((props: ContainerType) => props)`
  .dropdown {
    width: 160px;
    height: 40px;
    cursor: pointer;
    font-size: 16px;
    border-radius: ${({ theme }) => theme.rounded.main};
    background-color: ${({ drop }) =>
      drop === 'dark' ? ' #eaeaea' : 'white'};
    border-color: ${({ drop }) =>
      drop === 'dark' ? ' #eaeaea' : 'white'};

    &:before {
      content: '•';
      font-weight: bold;
      width: 8px;
      font-size: 28px;
      margin-right: 6px;
      color: ${({ isMain, theme }) =>
        isMain ? theme.colors.success.main : theme.colors.warn.main};
    }
    @media (max-width: 360px) {
      width: 144px;
      font-size: 14px;
      white-space: nowrap;
    }
  }
`;

export default Container;
