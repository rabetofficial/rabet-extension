import styled from 'styled-components';

export const Note = styled.div`
  p {
    padding-top: 20px;
    margin-top: 0;
  }
`;
export const Icon = styled.div`
  width: auto;
  height: auto;
  margin-top: -7px;

  span {
    font-size: 25px;
  }
`;
export const Msg = styled.div`
  font-size: 14px;
  line-height: 1.43;
  color: @dove-gray;
  margin-top: 8px;

  span {
    color: black;
    font-weight: 500;
  }
`;

export const Box = styled.div`
  card {
    margin-top: 6px;
    padding: 10px 12px 4px 12px;
    border-radius: 2px;
    line-height: 1.63;
    font-size: 16px;
    word-break: break-all;
    display: flex;
    flex-direction: column;
  }
`;
export const Copy = styled.div`
  display: block;
  width: fit-content;
  margin-top: 4px;
  margin-left: auto;
`;
