import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 0;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
`;

export const Status = styled.h1`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 6px;
  }

  &.warn {
    color: ${({ theme }) => theme.colors.warn.main};
    span {
      background: ${({ theme }) => theme.colors.warn.main};
    }
  }

  &.success {
    color: ${({ theme }) => theme.colors.success.main};
    span {
      background: ${({ theme }) => theme.colors.success.main};
    }
  }
`;
