import React from 'react';
import styled from 'styled-components';

type AppProps = {
  children: React.ReactNode;
  className?: string;
};

const Container = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rounded.main};
  box-shadow: rgba(134, 146, 164, 0.08);
  border: none;
  overflow: hidden;
`;

export default function PopoverContainer({
  children,
  className,
}: AppProps) {
  return <Container className={className}>{children}</Container>;
}

PopoverContainer.defaultProps = {
  className: '',
};
