import styled, { keyframes } from 'styled-components';

export const sleepAnimation = keyframes`
  0% {
    transform: translate(0, 0) scale(0.3);
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  3% {
    opacity: 1;
  }
  50% {
    transform: translate(90%, -50%) scale(0.65);
  }
  75% {
    opacity: 1;
  }
  100% {
    transform: translate(180%, -100%) scale(1);
    opacity: 0;
  }
`;

export const Sleeping = styled.div`
  position: relative;
  width: 58px;
  display: block;
  margin: 0 auto;
`;

export const Z = styled.span`
  color: black;
  position: absolute;
  top: 4px;
  right: -12px;
  font-size: 38px;
  opacity: 0;
  -moz-animation: ${sleepAnimation} 3s infinite linear;
  -webkit-animation: ${sleepAnimation} 3s infinite linear;
  animation: ${sleepAnimation} 3s infinite linear;
`;

export const Z1 = styled(Z)`
  animation-delay: 1s;
`;

export const Z2 = styled(Z)`
  animation-delay: 2s;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
  color: black;
  margin-top: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Msg = styled.div`
  font-size: 16px;
  line-height: 1.63;
  margin-top: 6px;
  color: ${({ theme }) => theme.colors.primary.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`;