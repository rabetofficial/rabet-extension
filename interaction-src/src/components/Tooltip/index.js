import React, {memo} from 'react';
import PropTypes from 'prop-types';
import TooltipTrigger from 'react-popper-tooltip';

const Trigger = children => ({ triggerRef, getTriggerProps }) => (
    <span
      { ...getTriggerProps({
          ref: triggerRef
        }) }
    >
      {children}
    </span>
);

const Tooltip = (tooltip, hideArrow, styleClass) => ({arrowRef, tooltipRef, getArrowProps, getTooltipProps, placement}) =>  {
    return(
    <div
      { ...getTooltipProps({
          className: `tooltip-container ${styleClass}`,
          ref: tooltipRef
        }) }
    >
      {!hideArrow && (
          <div
            { ...getArrowProps({
                className: 'tooltip-arrow',
                'data-placement': placement,
                ref: arrowRef
              }) }
          />
      )}
      {tooltip}
    </div>
)};

const BasicTooltipTrigger = memo(
    ({ tooltip, children, hideArrow, ...props }) => (
        <TooltipTrigger { ...props } tooltip={ Tooltip(tooltip, hideArrow, props.styleClass) }>
          {Trigger(children)}
        </TooltipTrigger>
    )
);

BasicTooltipTrigger.propTypes = {

};

export default BasicTooltipTrigger;
