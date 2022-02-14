import styled from 'styled-components';

export const Container = styled.div`
  &.large {
    padding: 32px;

    @media (max-width: ${({ theme }) => theme.screens.sm.max}) {
      padding: 12px;
    }
  }

  &.medium {
    padding: 11px 16px 24px 16px;
  }
`;

export const Content = styled.div`
  margin-top: 18px;
`;

export const Title = styled.h4`
  line-height: 1.56;
  color: black;
`;
