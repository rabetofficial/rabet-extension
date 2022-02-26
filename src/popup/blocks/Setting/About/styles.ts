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

export const ContactLinksContainer = styled.div`
  display: inline-flex;
  margin-top: 20px;
  span {
    margin-right: 20px;
  }
`;
