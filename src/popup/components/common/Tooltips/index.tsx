import React, { ReactElement, JSXElementConstructor } from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import { Placement } from 'popup/models';
import styled from 'styled-components';

type AppProps = {
  children:
    | ReactElement<any, string | JSXElementConstructor<any>>
    | undefined;
  text: string;
  placement?: Placement;
};

const Container = styled.div`
  background-color: white;
  border: none;
  border-radius: ${({ theme }) => theme.rounded.main};
  filter: drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.12));
  font-size: 14px;
  word-break: break-word;
  padding: 4px 8px;
  max-width: 200px;
  min-width: 110px;
  text-align: center;
`;

const Tooltips = ({ text, placement, children }: AppProps) => (
  <Tippy
    content={<Container>{text}</Container>}
    placement={placement}
    animation="shift-away"
    arrow={roundArrow}
    className="arrow-light"
    interactive
  >
    {children}
  </Tippy>
);

Tooltips.defaultProps = {
  placement: 'top',
};

export default Tooltips;
