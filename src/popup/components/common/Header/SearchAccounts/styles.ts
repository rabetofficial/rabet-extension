import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ToggleButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #395dc5;
  border: 1px solid #c9e6ff;
  background-color: #c9e6ff !important;
  font-size: 16px;
  padding: 0;
`;

export const Card = styled.div`
  width: 328px;
  background: white;
`;

export const InputSearch = styled.input`
  font-family: Roboto, 'icomoon';
  width: 100%;
  border: none;
  padding: 0 16.5px;
  border-bottom: 1px solid
    ${({ theme }) => theme.colors.primary.lighter};
  box-sizing: border-box;
  height: 41px;
  font-size: 14px;

  &:focus {
    outline: none;
    border: none;
    border-bottom: 1px solid
      ${({ theme }) => theme.colors.primary.lighter};
  }

  &::placeholder {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;

export const Group = styled.div`
  padding: 7px 0;
  background-color: ${({ theme }) => theme.colors.other.lightGray};
`;

export const GroupLink = styled(Link)`
  font-size: 16px;
  font-weight: 500;
  color: black;
  background-color: ${({ theme }) => theme.colors.other.lightGray};
  text-decoration: none !important;
  padding: 15px 17px;
  display: block;

  span {
    margin-right: 13px;
    font-family: 'Roboto', sans-serif;
  }
`;
