import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';

import styles from './styles.less';

const Tooltip = ({ children, tooltip, placement }) => {
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
      <span className={styles.container} ref={setTriggerRef}>{children}</span>
      {visible && (
        <span
          ref={setTooltipRef}
          {...getTooltipProps(
            { className: 'tooltip-container' },
          )}
        >
          <span {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltip}
        </span>
      )}
    </>
  );
};

export default Tooltip;
