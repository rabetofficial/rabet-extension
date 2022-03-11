import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px 32px;
  @media (max-width: 360px) {
    padding: 0px 16px 16px;
  }
`;

export const Page = styled.div`
  position: relative;
  padding: 30px 32px 24px;
  @media (max-width: 360px) {
    padding: 0px 16px 16px;
  }
`;
export const Content = styled.div`
  margin-top: 22px;
  @media (max-width: 360px) {
    margin-top: 8px;
  }
`;
export const ImgContainer = styled.div`
  width: 40px;
  height: 40px;
  margin: auto;
`;

export const Circle = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  display: flex;
  justift-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 24px;
`;
export const Title = styled.h4`
  font-size: 16px;
  color: #262728;
  margin: 2.5px 0 2.5px 0;
  font-weight: 500;
`;

export const Value = styled.div`
  margin-top: -2px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  word-break: break-all;

  a,
  a:hover {
    text-decoration: none !important;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const Hr = styled.hr`
  margin: 10px 0;
  border: none;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
`;
export const Table = styled.div`
  margin-top: 20px;

  table {
    width: 100%;
    border-spacing: 0;
    border-radius: 2px;
    border: 1px solid ${({ theme }) => theme.colors.primary.lighter};
  }

  th {
    color: #b1b1b1;
    font-weight: normal;
  }

  th,
  td {
    text-align: center;
    padding: 15px;
    font-size: 16px;
  }

  table td {
    border-left: 1px solid
      ${({ theme }) => theme.colors.primary.lighter};
    border-top: 1px solid
      ${({ theme }) => theme.colors.primary.lighter};
  }

  table th {
    border-left: 1px solid
      ${({ theme }) => theme.colors.primary.lighter};
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
export const Info = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.darkest};
`;

export const ErrorBox = styled.div`
  font-size: 14px !important;
  margin-top: 8px;
  font-size: 16px;
  padding: 4px 8px;
  background-color: #fbeded;
  border: 1px solid #fbeded;
  border-radius: 4px;
`;
