import React from 'react';

type IconType = { fill?: string };
function Icon({ fill }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
    >
      <path
        fill={fill}
        d="M8 8.8a.8.8 0 01-.8-.8V4.8a.8.8 0 111.6 0V8a.8.8 0 01-.8.8zm.304 3.136a.8.8 0 01-.608 0 .8.8 0 01-.264-.168.92.92 0 01-.168-.264.8.8 0 01.168-.872.92.92 0 01.264-.168.8.8 0 011.104.736.84.84 0 01-.232.568.8.8 0 01-.264.168zM8 16A8 8 0 118 0a8 8 0 010 16zM8 1.6a6.4 6.4 0 100 12.8A6.4 6.4 0 008 1.6z"
      />
    </svg>
  );
}
Icon.defaultProps = { fill: '#ce3d3d' };
export default Icon;
