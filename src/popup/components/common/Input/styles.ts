import styled from 'styled-components';

export const Group = styled.div.attrs(
  (props: { styleType: 'dark' | 'light' }) => ({
    styleType: props.styleType,
  }),
)`
  border: 1px solid
    ${({ styleType, theme }) =>
      styleType === 'dark'
        ? theme.colors.primary.light
        : theme.colors.primary.lighter};
  display: flex;
  overflow: hidden;
  margin-top: ${({ noMT }) => (noMT ? '0px' : '8px')};
  margin-bottom: 8px;

  &:focus,
  &:focus-within {
    border: 1px solid black;
  }

  &.large {
    height: 56px;
    border-radius: ${({ theme }) => theme.rounded.md};
    input {
      font-size: 16px;
    }
  }

  &.medium {
    height: 48px;
    border-radius: ${({ theme }) => theme.rounded.main};
    input {
      font-size: 16px;
    }
  }

  &.small {
    height: 40px;
    border-radius: ${({ theme }) => theme.rounded.main};
    input {
      font-size: 16px;
      padding-left: 12px;
    }
  }

  .input {
    width: 100%;
    border: none;
    color: black;
    padding-left: 16px;

    &:focus {
      border: none;
      outline: none;
    }

    &::placeholder {
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;

export const ErrorMsg = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error.main};
  margin: 0;
`;

export const Icon = styled.button`
  padding-right: 16px;
  background: transparent;
  border: 1px solid transparent;

  svg {
    margin-right: 0;
  }
`;

export const Max = styled.button`
  padding-right: 16px;
  background: transparent;
  border: 1px solid transparent;
  cursor: default;
`;

export const MaxIcon = styled.span`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-right: 0 !important;
  font-size: 15px;

  &:hover {
    transition: 0.3s ease-in;
    color: ${({ theme }) => theme.colors.primary.darkest};
  }
`;
