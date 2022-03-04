import styled from 'styled-components';

export const Comp = styled.div`
  position: absolute;
  z-index: 100;
`;
export const Header = styled.div`
  background: ${({ theme }) => theme.colors.primary.lighter};
  height: 60px;
  width: 360px;
`;
export const Icon = styled.div`
  color: ${({ theme }) => theme.colors.primary.darkest};
  font-size: 20px;
  text-decoration: none !important;

  icon-lock {
    float: right;
  }
`;
export const Logo = styled.div`
  width: 24px;
  height: 46px;
`;
export const Select = styled.div`
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
    group {
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
    background-color: ${({ theme }) => theme.colors.primary.darkest};
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
`;
export const Main = styled.div`
  .net__single-value:before {
    color: #40ab31;
  }
`;
export const Test = styled.div`
  .net__single-value:before {
    color: #f48b00;
  }
`;
