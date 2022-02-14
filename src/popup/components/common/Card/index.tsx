import React, { ReactNode } from 'react';

import StyledCard from './styles';

type AppProps = {
  children: ReactNode;
  type: 'primary' | 'secondary';
  className?: string;
};

const Card = ({ children, type, className }: AppProps) => (
  <StyledCard className={`${type} ${className}`}>
    {children}
  </StyledCard>
);

Card.defaultProps = {
  className: '',
};

export default Card;
