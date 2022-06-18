import styled from 'styled-components';

const Container = styled.div.attrs(
  (props: { width: number | null; height: number | null }) => ({
    width: props.width,
    height: props.height,
  }),
)`
  .ops__control {
    width: ${(props) => (props.width ? `${props.width}px` : '100%')};
    height: 48px;
    cursor: pointer;
    border-radius: 2px;
  }

  .ops__menu {
    z-index: 1000;
    box-shadow: 0 1px 10px rgba(134, 146, 164, 0.08);
    margin-bottom: 0;
    margin-top: 2px;
  }

  .ops__menu-list {
    max-height: ${(props) =>
      props.height ? `${props.height}px` : '200px'};
    padding-top: 0;
    padding-bottom: 0;
  }

  .ops__option {
    font-family: 'Roboto', sans-serif;
    cursor: pointer;
    font-size: 14px;
  }

  .ops__option--is-selected,
  .ops__option--is-focused {
    background-color: white;
    color: black;
  }

  .ops__option:hover {
    background-color: ${({ theme }) => theme.colors.other.lightGray};
    transition: 0.3s ease-in-out;
  }

  .ops__indicator-separator {
    display: none;
  }

  .ops__value-container {
    height: 40px;
    font-size: 14px;
  }

  .ops__single-value {
    font-size: 16px;
  }

  .ops__indicator {
    padding-left: 0;
  }

  .ops__indicator svg {
    color: black;
  }

  .ops__menu-list::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: white;
  }

  .ops__menu-list::-webkit-scrollbar {
    width: 6px;
    background-color: white;
  }

  .ops__menu-list::-webkit-scrollbar-thumb {
    transition: ease-in 0.3s;
  }

  .ops__menu-list::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transition: ease-in 0.3s;
  }
}

&.outlined {
  .ops__control {
    background-color: white;
  }

  .ops__single-value {
    font-weight: normal;
  }

  .ops__value-container {
    height: 40px;
    padding: 2px 8px;
  }

  .ops__indicator {
    padding-right: 8px;
  }

  .ops__option {
    font-size: 16px !important;
    height: 44px;
    display: flex;
    align-items: center;
  }

  .ops__menu-list {
    max-height: ${(props) =>
      props.height ? `${props.height}px` : '160px'};
  }
}

&.default {
  .ops__control {
    background-color: ${({ theme }) => theme.colors.other.lightGray};
  }

  .ops__single-value {
    font-weight: bold;
  }

  .ops__value-container {
    height: 40px;
    padding: 2px 16px;
  }

  .ops__option {
    font-size: 16px !important;
    height: 44px;
    display: flex;
    align-items: center;
  }

  .ops__indicator {
    padding-right: 16px;
  }
}

&.indicator-small {
  .ops__indicator svg {
    width: 17px;
  }
}

`;

export default Container;
