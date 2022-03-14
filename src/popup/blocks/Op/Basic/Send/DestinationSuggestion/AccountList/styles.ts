import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;

  > li {
    cursor: pointer;
    padding: 10px 14px;

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.other.lightGray};
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }

    &:not(:last-child) {
      border-bottom: 1px solid
        ${({ theme }) => theme.colors.primary.lighter};
    }
  }
`;

export const NotFound = styled.span`
  padding-left: 16px;
  margin-top: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  display: block;
`;

export const Avatar = styled.div`
  background-color: #c9e6ff;
  color: #395dc5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-size: 14px;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 500;
`;

export const Detail = styled.div`
  font-size: 12px;
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const ImageContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 28px;
    height: auto;
    border-radius: 50%;
  }
`;

export const Host = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: black;
  padding: 4px 8px;
`;
