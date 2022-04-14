import styled from 'styled-components';

export const Page = styled.div`
  position: relative;
  padding: 30px 32px 24px;
  @media (max-width: 360px) {
    padding: 0px 16px 16px;
  }
`;

export const Container = styled.div`
  padding: 30px 32px;
  @media (max-width: 360px) {
    padding: 0px 16px;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0;
`;

export const Label = styled.p`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #262728;
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
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 24px;
`;
export const Title = styled.h4`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.dark};
  margin: 2.5px 0 2.5px 0;
  font-weight: 500;
`;

export const Value = styled.div`
  margin-top: -2px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary.darkest};
  word-break: break-all;

  a,
  a:hover {
    text-decoration: none !important;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

export const BoxContainer = styled.div`
  margin-top: 23px;
`;

export const Media = styled.div`
  @media (min-width: 362px) {
    margin-top: 30px;
  } ;
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
  @media (max-width: 360px) {
    margin-top: 5px;
  }
`;
