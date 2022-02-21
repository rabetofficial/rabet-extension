import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
`;

export const ListItem = styled.li`
  height: 52px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary.light};
  margin-top: 8px;
  padding: 0 12px;
  cursor: pointer;

  &.active,
  &:hover {
    transition: 0.3s ease-in-out;
    border: 1px solid black;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;

    &:hover {
      border: 1px solid ${({ theme }) => theme.colors.primary.light};
    }
  }
`;

export const ListItemText = styled.div`
  margin: 0;
  font-size: 16px;
  line-height: 1.25;
`;

export const ListItemName = styled(ListItemText)`
  color: black;
  padding-right: 10px;
  font-weight: 500;
`;

export const ListItemWeb = styled(ListItemText)`
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: normal;
`;

export const Logo = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;

  img {
    width: 22px;
    height: auto;
  }
`;
