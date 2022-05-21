import styled from 'styled-components';

export const DropMenu = styled.div`
  &:focus {
    outline: none;
  }
`;

export const Toggle = styled.div`
  width: fit-content;
  margin-left: auto;

  &:focus {
    outline: none;
  }
`;

export const Menu = styled.div`
  position: absolute;
  right: 7px;
  top: 3px;
  overflow: hidden;
  box-shadow: 0 2px 14px rgba(134, 146, 164, 0.18);
  z-index: 99999;
  background-color: white;
  width: 0;
  height: 0;

  ul {
    list-style: none;
    margin: 0;
    padding: 10px 0;

    li {
      cursor: pointer;
      width: 100%;
      padding: 8px 16px;
      transition: background 0.25s, color 0.25s;
      display: flex;
      align-items: center;
      font-size: 16px;

      i {
        font-size: 17px;
      }

      .icon-flag {
        font-size: 18px;
      }
    }

    li:hover {
      background-color: #f8f8f8;
      transition: 0.3s ease-in-out;
    }
  }

  &.expanded {
    height: auto;
  }
`;
