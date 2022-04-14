import React from 'react';

type IconProps = { color?: string; size?: string };
type SwapProps = { color?: string; width?: string; height?: string };

Send.defaultProps = { color: '#000', size: '14' };
Receive.defaultProps = { color: '#000', size: '14' };
Swap.defaultProps = { color: '#323232', width: '16', height: '18' };

export function Send({ color, size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m4.785 1 7.616.054.034.002a.55.55 0 0 1 .02.002l-.054-.004a.55.55 0 0 1 .126.015l.015.005a.427.427 0 0 1 .076.026c.003.003.007.004.011.006a.54.54 0 0 1 .216.18l-.06-.07a.55.55 0 0 1 .104.144l.015.033a.43.43 0 0 1 .032.107l.004.024a.55.55 0 0 1 .005.054v.02L13 9.215a.548.548 0 0 1-1.086.107l-.01-.099-.045-6.308-9.924 9.924a.548.548 0 0 1-.838-.699l.063-.075 9.924-9.925-6.307-.044a.548.548 0 0 1-.536-.453l-.008-.099a.548.548 0 0 1 .453-.536L4.785 1z"
        fill={color}
        fillRule="nonzero"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Receive({ color, size }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.215 13 1.6 12.946l-.034-.002a.55.55 0 0 1-.02-.002l.054.004a.55.55 0 0 1-.126-.015l-.015-.005a.427.427 0 0 1-.076-.026c-.003-.003-.007-.004-.011-.006a.54.54 0 0 1-.216-.18l.06.07a.55.55 0 0 1-.104-.144l-.015-.033a.43.43 0 0 1-.032-.107l-.004-.024a.55.55 0 0 1-.005-.054v-.02L1 4.785a.548.548 0 0 1 1.086-.107l.01.099.045 6.308 9.924-9.925a.548.548 0 0 1 .838.7l-.063.075-9.924 9.925 6.307.044a.548.548 0 0 1 .536.453l.008.099a.548.548 0 0 1-.453.536L9.215 13z"
        fill={color}
        fillRule="nonzero"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Swap({ color, width, height }: SwapProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m11.93 8.628.074.062 3.84 3.84c.107.107.159.248.156.388v.027a.57.57 0 0 1-.358.54l-3.638 3.639a.533.533 0 0 1-.816-.68l.062-.074 2.852-2.854H.533c-.294 0-.533-.256-.533-.571 0-.28.189-.514.437-.562l.096-.01H14.18l-2.93-2.93a.533.533 0 0 1-.061-.68l.062-.073a.533.533 0 0 1 .68-.062zM4.75.156a.533.533 0 0 1 .062.68L4.75.91 1.82 3.84h13.647c.294 0 .533.256.533.571 0 .281-.189.514-.437.563l-.096.009-13.571-.001L4.75 7.836a.533.533 0 0 1 .062.68l-.062.074a.533.533 0 0 1-.68.062l-.074-.062-3.64-3.64A.57.57 0 0 1 0 4.411v-.014a.532.532 0 0 1 .094-.327l.062-.074 3.84-3.84a.533.533 0 0 1 .754 0z"
        fill={color}
        fillRule="nonzero"
      />
    </svg>
  );
}

export function SwapBack() {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.61.504a.556.556 0 0 0-.793 0 .56.56 0 0 0 0 .786l4.023 4.023H.563a.559.559 0 1 0 0 1.12H13.84l-4.023 4.015a.57.57 0 0 0 0 .794.556.556 0 0 0 .793 0l4.976-4.976a.56.56 0 0 0 0-.786L10.61.504z"
        fill="#AFAFAF"
        fillRule="nonzero"
      />
    </svg>
  );
}

export function SingleDot() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="4" r="4" fill="#000" fillRule="nonzero" />
    </svg>
  );
}

export function MultiDots() {
  return (
    <svg
      width="16"
      height="4"
      viewBox="0 0 16 4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.6 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2zM8 0a1.6 1.6 0 1 1 0 3.2A1.6 1.6 0 0 1 8 0zm6.4 0a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2z"
        fill="#000"
        fillRule="nonzero"
      />
    </svg>
  );
}
