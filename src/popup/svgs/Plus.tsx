import React from 'react';

type IconProps = { width?: string; height?: string };
function Icon({ width, height }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 14 14"
    >
      <path d="M6.364 0v6.364H0v1.272h6.364V14h1.272V7.636H14V6.364H7.636V0z" />
    </svg>
  );
}

Icon.defaultProps = { width: '14', height: '14' };
export default Icon;
