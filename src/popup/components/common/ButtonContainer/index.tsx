import React from 'react';
import styled from 'styled-components';
import { JustifyContent } from '../../../models';

const Container = styled.div.attrs((props: {size: number, gap: number, mt: number}) => props)`
  margin-top:  ${(props) => props.mt}px;
  
  button {
    width: ${(props) => props.size}px!important;

    ${({ gap }) => gap > 0 && `
    &:first-child {
      margin-right: ${gap / 2}px;
    }
    
    &:last-child {
      margin-left: ${gap / 2}px;
    }
  `}
  }
`;

type AppProps = {
  children: React.ReactNode
  btnSize: number
  justify: JustifyContent
  gap?: number
  mt?: number
}

const ButtonContainer = ({
  children, btnSize, justify, gap, mt,
}: AppProps) => (
  <Container
    className={`flex justify-${justify}`}
    size={btnSize}
    gap={gap}
    mt={mt}
  >
    {children}
  </Container>
);

ButtonContainer.defaultProps = {
  gap: 0,
  mt: 0,
};

export default ButtonContainer;
