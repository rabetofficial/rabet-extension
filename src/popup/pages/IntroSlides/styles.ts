import styled from 'styled-components';

export const ImgSlideOne = styled.div`
  margin: 90px auto 0 auto;
  width: 291px;
  height: 364px;
  display: block;

  @media (max-width: 630px) and (min-width: 360px) {
    margin-top: 48px;
    width: 224px;
    height: 280px;
  }
`;

export const ImgSlideTwo = styled.div`
  margin: 105px auto 0 151px;
  width: 334px;
  height: 348px;
  display: block;

  @media (max-width: 830px) and (min-width: 630px) {
    margin: 105px auto 0 auto;
  }
  @media (max-width: 630px) and (min-width: 360px) {
    margin: 64px auto 0 auto;
    width: 254px;
    height: 265px;
  }
`;

export const ImgSlideThird = styled.div`
  margin: 55px auto 0 auto;
  width: 352px;
  height: 385px;
  display: block;

  @media (max-width: 630px) and (min-width: 360px) {
    margin-top: 40px;
    width: 263px;
    height: 288px;
  }
`;

export const ImgSlideForth = styled.div`
  margin: 72px auto 0 auto;
  width: 288px;
  height: 376px;
  display: block;

  @media (max-width: 630px) and (min-width: 360px) {
    margin-top: 23px;
    width: 233px;
    height: 305px;
  }
`;

export const TextContainer = styled.div`
  text-align: center;
  @media (max-width: 630px) and (min-width: 360px) {
    margin-top: -18px !important;
  }
`;

export const HeadText = styled.p`
  font-size: 32px;
  margin-bottom: 19px;
  font-weight: bold;
  @media (max-width: 410px) and (min-width: 360px) {
    font-size: 20px;
    margin-bottom: 14px;
  }
`;

export const MainText = styled.p`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary.dark};
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;

  @media (max-width: 410px) and (min-width: 360px) {
    font-size: 16px;
  }
  @media (max-width: 360px) {
    font-size: 14px;
    width: 328px;
    margin: 0 auto;
  }
`;

interface IndicatorsProps {
  disabled: boolean;
  theme: any;
  index: number;
}

export const Indicators = styled.div<IndicatorsProps>`
  width: 40px;
  height: 2px;
  margin: -99px 4px 0px 4px;
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.primary.light
      : theme.colors.primary.darkest};
  @media (max-width: 630px) and (min-width: 360px) {
    margin: 0;
    width: 25%;
    position: absolute;
    top: 0px;
    left: ${({ index }) => index * 25}%;
  }
`;

interface CircleProps {
  thirdSlide: boolean;
  theme: any;
}
export const Circle = styled.div<CircleProps>`
  margin-top: -215px;
  padding: 21.5px 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px ${({ theme }) => theme.colors.primary.lighter};
  border-radius: 50%;
  cursor: pointer;
  @media (max-width: 630px) and (min-width: 360px) {
    display: ${({ thirdSlide }) => (thirdSlide ? 'none' : 'block')};
  }
`;

export const LeftCircle = styled(Circle)<CircleProps>`
  @media (max-width: 800px) and (min-width: 630px) {
    position: absolute;
    left: 3px;
  }
  @media (max-width: 630px) and (min-width: 360px) {
    position: absolute;
    bottom: 48px;
    left: 108px;
  }
`;

export const RightCircle = styled(Circle)<CircleProps>`
  @media (max-width: 800px) and (min-width: 630px) {
    position: absolute;
    right: 3px;
  }
  @media (max-width: 630px) and (min-width: 360px) {
    position: absolute;
    bottom: 48px;
    right: 108px;
  }
`;

export const SlidesContainer = styled.div`
  @media (min-width: 1280px) {
    width: 790px;
  }
  @media (max-width: 1280px) and (min-width: 1024px) {
    width: 770px;
  }
  @media (max-width: 1024px) and (min-width: 768px) {
    width: 770px;
  }
  @media (max-width: 768px) and (min-width: 620px) {
    width: 720px;
  }
  @media (max-width: 620px) and (min-width: 475px) {
    width: 600px;
  }
  @media (max-width: 475px) and (min-width: 360px) {
    width: 400px;
  }
`;
