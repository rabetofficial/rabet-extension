import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px 32px 0px;
  @media (max-width: 360px) {
    padding: 16px 16px 0px;
  }
  @media (max-height: 600px) {
    width: 360px;
  } ;
`;

export const Info = styled.div`
  display: inline-flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
`;

export const Title = styled.h1`
  font-size: 18px;
  color: black;
  font-weight: 500;
  margin: 0;
`;

export const ValueTitle = styled.h2`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.darkest};
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
