import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border-radius: 2px;
  box-shadow: 0 2px 10px 0 rgba(134, 146, 164, 0.08);
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
`;
