import styled from 'styled-components';

type ContainerType = {
  isMain: boolean;
};

const Container = styled.div.attrs((props: ContainerType) => props)`
  .net__control {
    width: 160px;
    height: 40px;
    cursor: pointer;
    background: #eaeaea;
    border-color: #eaeaea;
    margin: 0 auto;
  }

  .net__control:hover {
    border-color: #eaeaea;
  }

  .net__menu {
    width: 160px;
    z-index: 1000;
    border-radius: 0;
    box-shadow: 0 2px 10px rgba(134, 146, 164, 0.08);
    left: 50%;
    transform: translate(-50%);
  }

  .net__menu-list {
    max-height: initial;
  }

  .net__menu-list {
    :local(.group) {
      display: none;
    }
  }

  .net__option {
    padding: 10px 12px;
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    font-size: 15px;
  }

  .net__option--is-selected,
  .net__option--is-focused {
    background-color: white;
    color: black;
  }

  .net__option:hover {
    background-color: #f8f8f8;
    transition: 0.3s ease-in-out;
  }

  .net__indicator-separator {
    display: none;
  }

  .net__indicator svg {
    color: black;
    width: 18px;
  }

  .net__indicator {
    padding-left: 0;
    padding-right: 10px;
  }

  .net__value-container {
    height: 40px;
    padding: 2px 5px;
    font-size: 16px;
  }

  .net__single-value {
    margin-left: 6px;
    display: flex;
    align-items: center;
  }

  .net__single-value:before {
    content: '•';
    font-weight: bold;
    width: 8px;
    font-size: 28px;
    margin-right: 6px;
  }

  .net__single-value:before {
    color: ${({ isMain, theme }) =>
      isMain ? theme.colors.success.main : theme.colors.warn.main};
  }
`;

export default Container;
