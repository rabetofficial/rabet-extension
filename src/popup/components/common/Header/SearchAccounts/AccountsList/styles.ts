import styled from 'styled-components';

export const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  max-height: 210px;
  overflow-y: scroll;

  > li {
    cursor: pointer;
    padding-left: 16px;

    &:hover {
      background-color: ${({ theme }) =>
        theme.colors.other.lightGray};
      cursor: pointer;
      transition: 0.2s ease-in-out;
    }
  }
`;

export const Border = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  height: 0.5px;
  width: 100%;
`;

export const NotFound = styled.span`
  padding-left: 16px;
  margin-top: 16px;
  margin-bottom: 12px;
  font-size: 13px;
  display: block;
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 0;
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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-size: 14px;
  color: black;
  font-weight: 500;
`;

export const Amount = styled.div`
  font-size: 12px;
  margin-top: 6px;
  color: #6c6c6c;
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
