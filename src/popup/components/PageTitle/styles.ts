import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

export const Status = styled.h1`
  margin: 0;
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
`;

export const Warn = styled(Status)`
  color: #f48b00;
  span {
    background: #f48b00;
  }
`;

export const Success = styled(Status)`
  color: ${({ theme }) => theme.colors.Success};
  span {
    background: ${({ theme }) => theme.colors.Success};
  }
`;

export const Icon = styled.div`
  cursor: pointer;

  span {
    color: #b1b1b1;
  }
`;
