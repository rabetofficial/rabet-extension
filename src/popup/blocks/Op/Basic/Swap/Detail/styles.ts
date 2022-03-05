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
    color: ${({ theme }) => theme.colors.success.main};
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
    width: 9px;
    height: auto;

    path {
      fill: #afafaf;
    }
  }
`;
