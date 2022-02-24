import React from 'react';

type IconSize = { width?: string; height?: string };

const Icon = ({ width, height }: IconSize) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16 0C7.176 0 0 7.176 0 16s7.176 16 16 16 16-7.176 16-16S24.824 0 16 0zm8.774 9.29a1.031 1.031 0 0 1 .73 1.762L13.117 23.44a1.03 1.03 0 0 1-1.46 0l-5.161-5.162a1.031 1.031 0 1 1 1.46-1.46l4.431 4.432L24.044 9.593c.202-.202.466-.303.73-.303z"
      fill="#000"
      fillRule="nonzero"
    />
  </svg>
);

Icon.defaultProps = {
  width: '32',
  height: '32',
};

export default Icon;
