import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer !important;

  span[class^='icon'] {
    margin-right: 10px;
  }

  &.large {
    width: 100%;
    height: 56px;
    font-size: 16px;
    font-weight: 500;
    border: none !important;
    border-radius: 2px !important;
  }

  &.medium {
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    padding-right: 26px;
    padding-left: 26px;
    border-radius: 2px;
  }

  &.small {
    height: 40px;
    font-size: 16px;
    font-weight: 500;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 2px;
  }

  &.danger {
    color: @Flush-mahogany;
    background-color: @Alabaster;
    border: 2px solid @Alabaster;

    &:hover {
      box-shadow: 0 2px 13px 0 rgba(0, 0, 0, 0.12);
    }

    &:disabled {
      background-color: @Alabaster;
      border: 2px solid @Alabaster;
      color: @Secondary-Silver-chalice;
    }
  }

  &.basic-default {
    background: @Concrete;
    border: 2px solid @Concrete;
    color: @dove-gray;

    &:hover {
      color: @dove-gray;
    }
  }

  &.default {
    background: transparent;
    border: 2px solid transparent;
    color: @dove-gray;

    &:hover {
      color: black;
    }
  }

  &.outlined {
    background: transparent;
    outline: 1px solid black !important;
    color: black;

    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.17);
    }
  }

  &.primary {
    background: black !important;
    border: 2px solid black;
    color: white;

    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
    }

    &:disabled {
      background: @Silver-chalice;
      border: 2px solid @Silver-chalice;
      color: white;
    }
  }

  &.secondary {
    background: white;
    border: 2px solid black;
    color: black;

    &:disabled {
      background: @Silver-chalice;
      border: 2px solid @Silver-chalice;
      color: white;
    }
  }

  .button {
    width: 100%;
    border: none;

    &:focus {
      border: none;
      outline: none;
    }

    &:disabled {
      cursor: default !important;

      &:hover {
        box-shadow: none !important;
      }
    }
  }
`;

export const Icon = styled.div`
  margin: 0 10px;
`;
