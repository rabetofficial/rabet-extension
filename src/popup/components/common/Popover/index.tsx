import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';

import { Placement } from 'popup/models';
import Container from './Container';

type AppProps = {
  children: React.ReactNode;
  placement?: Placement;
  className?: string;
  onHide?: () => void;
};

const Popover = forwardRef(
  (
    { children, placement, className, onHide }: AppProps,
    ref: any,
  ) => (
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
      onHide={onHide}
    />
  ),
);

Popover.defaultProps = {
  placement: 'top',
  className: '',
  onHide: () => {},
};

export default Popover;
