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
    width: 100%;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    padding-right: 26px;
    padding-left: 26px;
    border-radius: 2px;
  }

  &.small {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: 500;
    padding-right: 20px;
    padding-left: 20px;
    border-radius: 2px;
  }

  &.danger {
    color: ${({ theme }) => theme.colors.error.main};
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
    background: ${({ theme }) => theme.colors.primary.lighter};
    border: 2px solid ${({ theme }) => theme.colors.primary.lighter};
    color: ${({ theme }) => theme.colors.primary.dark};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.dark};
    }
  }

  &.default {
    background: transparent;
    border: 2px solid transparent;
    color: ${({ theme }) => theme.colors.primary.dark};

    &:hover {
      color: ${({ theme }) => theme.colors.primary.darkest};
    }
  }

  &.outlined {
    background: transparent;
    outline: 1px solid ${({ theme }) => theme.colors.primary.darkest} !important;
    color: ${({ theme }) => theme.colors.primary.darkest};

    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.17);
    }
  }

  &.primary {
    background: ${({ theme }) => theme.colors.primary.darkest} !important;
    border: 2px solid ${({ theme }) => theme.colors.primary.darkest};
    color: ${({ theme }) => theme.colors.primary.lightest};

    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.25);
    }

    &:disabled {
      background: @Silver-chalice;
      border: 2px solid @Silver-chalice;
      color: ${({ theme }) => theme.colors.primary.lightest};
    }
  }

  &.secondary {
    background: ${({ theme }) => theme.colors.primary.lightest};
    border: 2px solid ${({ theme }) => theme.colors.primary.darkest};
    color: ${({ theme }) => theme.colors.primary.darkest};

    &:disabled {
      background: @Silver-chalice;
      border: 2px solid @Silver-chalice;
      color: ${({ theme }) => theme.colors.primary.lightest};
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
