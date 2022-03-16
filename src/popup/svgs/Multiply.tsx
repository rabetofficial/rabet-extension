import React from 'react';

type IconType = { size?: number };
function Icon({ size }: IconType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 17 17"
    >
      <path
        fill="#B1B1B1"
        d="M10.35 8.385l5.293-5.28a1.236 1.236 0 00-1.748-1.748l-5.28 5.292-5.28-5.292a1.236 1.236 0 00-1.747 1.748l5.292 5.28-5.292 5.28a1.23 1.23 0 000 1.747 1.23 1.23 0 001.747 0l5.28-5.292 5.28 5.292a1.23 1.23 0 001.748 0 1.23 1.23 0 000-1.747l-5.292-5.28z"
      />
    </svg>
  );
}
Icon.defaultProps = { size: 17 };
export default Icon;
