import React from 'react';

type IconProps = { size?: string };
function Icon({ size }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 13 13"
    >
      <path
        fill="#000"
        d="M9.432.35a1.191 1.191 0 011.686 0l1.533 1.533c.465.465.465 1.22 0 1.685L3.569 12.65a1.19 1.19 0 01-.844.35H.511A.51.51 0 010 12.49v-2.215c0-.317.126-.62.35-.843zM7.92 3.305l-6.85 6.85a.168.168 0 00-.048.119v1.703h1.703a.17.17 0 00.085-.022l.036-.028L9.694 5.08 7.92 3.306zm2.474-2.235a.17.17 0 00-.24 0L8.642 2.584l1.774 1.774 1.513-1.512a.17.17 0 00.031-.196l-.032-.044z"
      />
    </svg>
  );
}

Icon.defaultProps = { size: '13' };

export default Icon;
