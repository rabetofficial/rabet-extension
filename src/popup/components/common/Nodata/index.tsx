import React from 'react';

type AppProps = {
  msg: string;
  className?: string;
};

const NoDate = ({ msg, className }: AppProps) => (
  <div
    className={`text-sm text-primary-dark py-6 text-center ${className}`}
  >
    {msg}
  </div>
);

NoDate.defaultProps = {
  className: '',
};

export default NoDate;
