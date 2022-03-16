import styled from 'styled-components';

export const Hr = styled.hr`
  margin: 17px 0 15px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;

export const Item = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.primary.darkest};
`;

export const ItemHead = styled.p`
  font-size: 16px;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const Circle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  width: 50px;
  height: 50px;
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.lighter};
    transition: 1s background-color;
  }
`;

export const ContactLinksContainer = styled.div`
  cursor: pointer;
  display: inline-flex;
  margin-top: 20px;
`;
