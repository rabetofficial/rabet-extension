import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import { Placement } from 'popup/models';
import Container from './Container';

type AppProps = {
  children: React.ReactNode;
  placement?: Placement;
  className?: string;
};

const Popover = forwardRef(
  ({ children, placement, className }: AppProps, ref: any) => (
    <Tippy
      content={
        <Container className={className}>{children}</Container>
      }
      placement={placement}
      reference={ref}
      trigger="click"
      animation="shift-away"
      arrow={roundArrow}
      className="arrow-light"
      interactive
    />
  ),
);

Popover.defaultProps = {
  placement: 'top',
  className: '',
};

export default Popover;