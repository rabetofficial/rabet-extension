import styled from 'styled-components';

export const Scan = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScanText = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin: 0;
  color: @dove-gray;
`;

export const Key = styled.div`
  margin: 0;
  font-size: 16px;
  color: @dove-gray;
  word-break: break-all;
  line-height: 1.5;
`;

export const Copy = styled.div`
  display: block;
  width: fit-content;
  margin-top: 4px;
  margin-left: auto;
`;
