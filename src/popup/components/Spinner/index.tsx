import React from 'react';
import styled from 'styled-components';

type SpinnerType = {
  height?: number;
  width?: number;
  color?: string;
};
const Spinner = ({ height, width, color }: SpinnerType) => (
  <StyledSpinner
    viewBox="0 0 50 50"
    width={width}
    height={height}
    stroke={color}
  >
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="2.6"
    />
  </StyledSpinner>
);

const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;

  & .path {
    stroke-linecap: round;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 85;
    }

    100% {
      transform: rotate(360deg);
      stroke-dasharray: 85;
    }
  }
`;

Spinner.defaultProps = { height: 48, width: 48, color: 'black' };

export default Spinner;
