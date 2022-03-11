import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 32px 32px;
  @media (max-width: 360px) {
    padding: 0 16px;
    align-items: flex-start;
  }
`;

export const Msg = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin-top: 11px;
  span {
    color: ${({ theme }) => theme.colors.primary.darkest};
    font-weight: 500;
  }
`;

export const Box = styled.div`
  margin-top: 6px;
  padding: 10px 4px 4px 12px;
  border-radius: 2px;
  line-height: 1.63;
  font-size: 16px;
  word-break: break-all;
  display: flex;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 2px;
`;

export const Label = styled.div`
  font-size: 16px;
  margin: 20px 0 6px 0;
  font-weight: 500;
  @media (max-width: 360px) {
    margin-top: 22px;
  }
`;

export const Copy = styled.div`
  display: block;
  width: fit-content;
  margin: 0px 0 0px auto;
`;
export const ButtonContainer = styled.div`
  @media (max-width: 360px) {
    margin-top: 106px;
  }
`;
