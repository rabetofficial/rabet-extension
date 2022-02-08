import styled from 'styled-components';

type ContainerType = {
  isMain: boolean;
};

const Container = styled.div.attrs((props: ContainerType) => props)`
  .dropdown {
    width: 160px;
    height: 40px;
    cursor: pointer;
    background: #eaeaea;
    border-color: #eaeaea;
    font-size: 16px;
    border-radius: 2px;

    &:before {
      content: '•';
      font-weight: bold;
      width: 8px;
      font-size: 28px;
      margin-right: 6px;
      color: ${({ isMain, theme }) =>
        isMain ? theme.colors.success.main : theme.colors.warn.main};
    }
  }
`;

export default Container;
