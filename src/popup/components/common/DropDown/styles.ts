import styled from 'styled-components';

export const Content = styled.ul`
  background-color: white;
  box-shadow: 0 2px 10px rgba(134, 146, 164, 0.08);
  border-radius: 2px;

  > li {
    padding: 10px 12px;
    cursor: pointer;
    font-size: 15px;
    z-index: 100;

    &:hover {
      background-color: #f8f8f8;
      transition: 0.3s ease-in-out;
    }
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  svg {
    margin-left: 13px;
  }
`;
