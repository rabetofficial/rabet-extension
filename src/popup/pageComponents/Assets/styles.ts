import styled from 'styled-components';

export const Page = styled.div`
  position: relative;

  .content {
    padding-top: 28px;
    padding-bottom: 20px;
  }
`;
export const Title = styled.h4`
  font-size: 16px;
  color: @shark;
  margin: 0 0 5px 0;
  font-weight: 500;
`;

export const Value = styled.p`
  font-size: 16px;
  line-height: 1.63;
  color: @dove-gray;
  margin: 0;
  word-break: break-all;

  a,
  a:hover {
    text-decoration: none !important;
    color: @dove-gray;
  }
`;

export const Hr = styled.hr`
  margin-top: 9px;
  margin-bottom: 10px;
  border: none;
  height: 1px;
  background-color: @gallery;
`;
export const Table = styled.div`
  margin-top: 24px;

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 2px;
    border: 1px solid @gallery;
  }

  th {
    color: @abbey;
    font-weight: normal;
  }

  th,
  td {
    text-align: center;
    padding: 15px;
    font-size: 16px;
  }

  table td {
    border-left: 1px solid @gallery;
    border-top: 1px solid @gallery;
  }

  table th {
    border-left: 1px solid @gallery;
  }

  table th:first-child {
    border-radius: 2px 0 0 0;
  }

  table th:last-child {
    border-radius: 0 2px 0 0;
  }

  table td:first-child,
  table th:first-child {
    border-left: medium none;
  }
`;
