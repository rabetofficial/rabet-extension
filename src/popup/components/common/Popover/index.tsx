import React, { forwardRef } from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import styled from 'styled-components';

import { Placement } from 'popup/models';

type AppProps = {
  children: React.ReactNode;
  placement?: Placement;
  className?: string;
  onHide?: () => void;
};

const Container = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rounded.main};
  box-shadow: rgba(134, 146, 164, 0.08);
  border: none;
  overflow: hidden;
`;

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
