import styled from 'styled-components';

export const ImgSlideOne = styled.div`
  margin: 90px auto 0 auto;
  width: 291px;
  height: 364px;
  display: block;

  @media (max-width: 360px) {
    width: 300px;
    height: 280px;
  }
`;
export const ImgSlideTwo = styled.div`
  margin: 105px auto 0 auto;
  width: 334px;
  height: 348px;
  display: block;

  @media (max-width: 360px) {
    width: 300px;
    height: 280px;
  }
`;
export const ImgSlideThird = styled.div`
  margin: 72px auto 0 auto;
  width: 352px;
  height: 385px;
  display: block;

  @media (max-width: 360px) {
    width: 300px;
    height: 280px;
  }
`;
export const ImgSlideForth = styled.div`
  margin: 67px auto 0 auto;
  width: 292px;
  height: 381px;
  display: block;

  @media (max-width: 360px) {
    width: 300px;
    height: 280px;
  }
`;
interface IndicatorsProps {
  disabled: boolean;
  theme: any;
}
export const Indicators = styled.div<IndicatorsProps>`
  width: 40px;
  height: 2px;
  margin: -50px 4px 0px 4px;
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.primary.light
      : theme.colors.primary.darkest};
`;

export const Circle = styled.div`
  margin-top: -135px;
  padding: 21.5px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 50%;
  cursor: pointer;
`;
