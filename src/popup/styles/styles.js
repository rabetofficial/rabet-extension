import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  .form {
    display: flex;
    flex-direction: column;
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
    
    &-large {
      height: 56px;
      border-radius: 4px;

      input {
        font-size: 16px;
      }
    }
    
    &-medium {
      height: 48px;
      border-radius: 2px;

      input {
        font-size: 16px;
      }
    }
    
    &-small {
      height: 36px;
      border-radius: 2px;

      input {
        font-size: 16px;
        padding-left: 12px;
      }
    }
  }
  
  .label {
    &-primary {
      font-size: 16px;
      color: black;
      font-weight: 500;
    }
    
    &-secondary, &-optional {
      color: ${({ theme }) => theme.colors.primary.main};
    }

    &-secondary {
      font-size: 16px;
    }

    &-optional {
      font-size: 12px;
    }
  }

  .error {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.error.main};
    margin: 0;
  }
`;

export default GlobalStyle;
