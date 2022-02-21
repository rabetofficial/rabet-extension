import styled from 'styled-components';

export const container = styled.div`
  min-width: '328px';
  max-width: '428px';
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  display: flex;
  align-items: center;
`;

export const IconContainer = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
`;

export const Msg = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  word-break: break-word;
  margin-top: 18px;
  margin-bottom: 32px;
  line-height: 1.63;

  @media (max-width: 360px) {
    margin-bottom: 28px;
    line-height: 1.5;
  }

  .icon-sheet {
    font-size: 16px;
    cursor: pointer;
  }
`;

export const Btn = styled.div`
  font-weight: bold;
  margin-bottom: 1px;
  width: 98px;
`;
