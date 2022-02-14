import styled from 'styled-components';

const StyledCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  &.primary {
    border-radius: 2px;
  }

  &.secondary {
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  }
`;

export default StyledCard;
