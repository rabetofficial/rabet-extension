import React from 'react';

type AppProps = {
  msg: string;
  className?: string;
};

const NoDate = ({ msg, className }: AppProps) => (
  <div
    className={`text-base text-primary py-6 text-center font-medium	${className}`}
  >
    {msg}
  </div>
);

NoDate.defaultProps = {
  className: '',
};

export default NoDate;
