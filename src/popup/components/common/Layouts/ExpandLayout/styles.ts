import styled from 'styled-components';
import Copy from 'popup/svgs/Copy';
import svgToMarkupString from '../../../../../helpers/svgToMarkupString';

export const Container = styled.div`
  padding: 23px 54px 65px 54px;
  background-color: ${({ theme }) => theme.colors.primary.lighter};
  min-height: 100vh;
  height: 100%;
`;

export const XLResponsive = styled.div`
  @media (min-width: ${({ theme }) => theme.screens.xl.min}) {
    width: 1118px;
    display: block;
    margin: 0 auto;
  }
`;

export const Card = styled.div`
  background-color: white;
  padding-right: 20px;
  padding-left: 20px;
  box-shadow: 0 2px 10px 0 rgba(134, 146, 164, 0.05);
`;

export const CardSimple = styled.div`
  background-color: white;
  box-shadow: 0 2px 10px 0 rgba(134, 146, 164, 0.05);
`;

export const QrTrigger = styled.button`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary.dark};
`;

export const AddressBox = styled.div`
  border: solid 1px ${({ theme }) => theme.colors.primary.light};
  border-radius: ${({ theme }) => theme.rounded.main};
  padding: 12px 14px;
  margin-top: 6px;
`;

export const Address = styled.div`
  font-size: 14px;
  line-height: 1.43;
  word-break: break-all;
  cursor: pointer;

  &:after {
    transform: scale(0.9);
    padding-left: 2px;
    position: absolute;
    content: ${({ color }) =>
      `url(${svgToMarkupString(Copy, {
        color,
      })})`};
  }
`;

export const AssetTrigger = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary.dark};
  cursor: pointer;
`;
