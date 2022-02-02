import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import styled from 'styled-components';

import { TooltipPlacement } from 'popup/models';

const Container = styled.span`
  width: fit-content;
`;

type AppProps = {
  children: React.ReactNode;
  tooltip: string;
  placement: TooltipPlacement;
};

const Tooltip = ({ children, tooltip, placement }: AppProps) => {
  const {
    getArrowProps,
    getTooltipProps,
    setTooltipRef,
    setTriggerRef,
    visible,
  } = usePopperTooltip({
    placement,
  });

  return (
    <>
      <Container ref={setTriggerRef}>{children}</Container>
      {visible && (
        <span
          ref={setTooltipRef}
          {...getTooltipProps({ className: 'tooltip-container' })}
        >
          <span {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltip}
        </span>
      )}
    </>
  );
};

export default Tooltip;
