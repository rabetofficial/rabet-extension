import styled from 'styled-components';

export const CustomInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2px;
  width: 145px;
  height: 48px;
  padding: 0 8px;
`;

export const DatepickerContainer = styled.div`
  .react-datepicker-wrapper {
    width: fit-content;
  }

  .react-datepicker {
    border: none;
    border-radius: 2px;
    box-shadow: 0 2px 20px 0 rgba(134, 146, 164, 0.23);
  }

  .react-datepicker-popper {
    transition: linear 0.23s, opacity 400ms;
  }

  .react-datepicker__header {
    border-bottom: 1px solid black;
    background-color: black;
    font-family: 'Roboto', sans-serif;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .react-datepicker__current-month {
    font-weight: 500;
    color: white;
  }

  .react-datepicker__day {
    color: ${({ theme }) => theme.colors.primary.dark};
    font-family: 'Roboto', sans-serif;

    &:hover {
      background-color: gray;
    }
  }

  .react-datepicker__day-name {
    color: white;
  }

  .react-datepicker__triangle::before {
    border-top-color: black !important;
    border-bottom-color: black !important;
    top: 0 !important;
  }

  .react-datepicker__triangle::after {
    border-bottom-color: black !important;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: black;
    color: white;
    border-radius: 2px;

    &:hover {
      transition: ease-in;
      background-color: lightblue;
    }

    &:focus {
      outline: none;
    }
  }

  .react-datepicker__navigation {
    top: 9px;
  }

  .react-datepicker__navigation-icon::before {
    border-color: white;
    border-width: 2px 2px 0 0;
  }

  .react-datepicker__day--disabled {
    color: #ccc;

    &:hover {
      background-color: inherit;
    }
  }
`;
