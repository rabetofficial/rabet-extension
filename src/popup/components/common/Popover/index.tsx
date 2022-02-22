import React from 'react';
import Tippy from '@tippyjs/react';
import { roundArrow } from 'tippy.js';
import styled from 'styled-components';

import { FullPlacement } from 'popup/models';

type AppProps = {
  children: React.ReactNode;
  placement?: FullPlacement;
  className?: string;
  onHide?: () => void;
  visible: boolean;
  hideFunc: () => void;
  triggerElement: React.ReactNode;
};

const Container = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.rounded.main};
  box-shadow: rgba(134, 146, 164, 0.08);
  border: none;
  overflow: hidden;
`;

const Popover = ({
  children,
  placement,
  className,
  onHide,
  visible,
  hideFunc,
  triggerElement,
}: AppProps) => (
  <Tippy
    content={<Container className={className}>{children}</Container>}
    placement={placement}
    trigger="click"
    animation="shift-away"
    arrow={roundArrow}
    className="arrow-light"
    interactive
    onHide={onHide}
    visible={visible}
    onClickOutside={hideFunc}
  >
    <div>{triggerElement}</div>
  </Tippy>
);

Popover.defaultProps = {
  placement: 'top',
  className: '',
  onHide: () => {},
};

export default Popover;
