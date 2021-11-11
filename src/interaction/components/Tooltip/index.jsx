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
    <div>
      <div className={styles.container} ref={setTriggerRef}>{children}</div>
      {visible && (
        <div
          ref={setTooltipRef}
          {...getTooltipProps(
            { className: 'tooltip-container' },
          )}
        >
          <div {...getArrowProps({ className: 'tooltip-arrow' })} />
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
