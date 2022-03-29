import styled from 'styled-components';

export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
`;

export const BoxTitle = styled.div`
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const BoxValue = styled.div`
  &.up {
    color: ${({ theme, color }) =>
      color === 'green'
        ? theme.colors.success.main
        : color === 'orange'
        ? theme.colors.warn.main
        : theme.colors.error.main};
  }

  &.down {
    color: ${({ theme }) => theme.colors.error.main};
  }
`;

export const Path = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin: 0 5px;
    width: 8px;
    height: auto;

    path {
      fill: #afafaf;
    }
  }
`;
