import styled from 'styled-components';

export const Confirm = styled.div`
  position: relative;
`;
export const Source = styled.p`
  margin: 0;
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 4px;
  padding: 12px 11px;
  align-items: center;
`;
export const SourceTitle = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary.dark};
`;
export const SourceValue = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: black;
`;
export const Box = styled.div``;
export const Title = styled.h1`
  font-size: 18px;
  color: black;
  font-weight: 500;
  margin: 0;
`;
export const ValueTitle = styled.h2`
  font-size: 16px;
  color: black;
  font-weight: 500;
  margin: 16px 0 0 0;
`;
export const Value = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin: 6px 0 4px 0;
  word-break: break-all;
  line-height: 1.5;
`;
