import styled from 'styled-components';

export const StyledButton = styled.button`
  text-align: center;
  border-radius: ${({ theme }) => theme.rounded.main};
  background: ${({ theme }) => theme.colors.primary.lighter};
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 12px;
  cursor: pointer;
  width: 60px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 4px;
    path {
      fill: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

export default StyledButton;
