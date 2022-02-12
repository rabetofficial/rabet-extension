import styled from 'styled-components';

export const Tabs = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  border-bottom: 1.5px solid
    ${({ theme }) => theme.colors.primary.lighter};
`;

export const TabTitle = styled.li`
  background-color: transparent;
  display: inline-block;
  padding: 9px 15px;
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
  text-align: center;
  font-size: 16px;
  transition: all ease-in 0.15s;
  border-bottom: 1px solid transparent;

  &.active {
    color: black;
    border-bottom: 1.5px solid black;
  }
`;

export const TabContent = styled.div`
  padding-top: 24px;
  margin: 0;
`;
