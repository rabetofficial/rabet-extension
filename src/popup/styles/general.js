import { createGlobalStyle } from 'styled-components';

const GeneralStyle = createGlobalStyle`
  .form {
    display: flex;
    flex-direction: column;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
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

  .tooltip-container {
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.13) !important;
    font-size: 14px;
    border: none !important;
    padding: 4px 8px !important;
    max-width: 200px;
    text-align: center;
    word-break: break-word;
    font-weight: normal !important;
    white-space: normal !important;
    min-width: 110px !important;
  }

  .tooltip-container[data-popper-placement*='bottom'] .tooltip-arrow::before {
    border-color: transparent transparent rgba(0, 0, 0, 0.07) transparent;
  }

  .tooltip-container[data-popper-placement*='top'] .tooltip-arrow::before {
    border-color: rgba(0, 0, 0, 0.07) transparent transparent transparent;
  }

  .tooltip-container[data-popper-placement*='right'] .tooltip-arrow::before {
    border-color: transparent rgba(0, 0, 0, 0.07) transparent transparent;
  }

  .tooltip-container[data-popper-placement*='left'] .tooltip-arrow::before {
    border-color: transparent transparent transparent rgba(0, 0, 0, 0.07);
  }

  .tooltip-arrow[data-placement*='top'] {
    height: 0.3rem;
    margin-bottom: -0.3rem;
  }

  .error {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.error.main};
    margin: 0;
  }

  .error-box {
    color: ${({ theme }) => theme.colors.error.main};
    padding: 8px 12px 8px 14px;
    font-size: 14px;
    line-height: 1.43;
    //border: 1px solid @Linen;
    //background-color: @Chablis;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

export default GeneralStyle;
