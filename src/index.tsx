/** 
 * source: https://github.com/mui-org/material-ui/blob/v1-beta/src/utils/ClickAwayListener.js
 */

import * as React from "react";
import { findDOMNode } from "react-dom";
import EventListener from "react-event-listener";

type Optional<T> = T | null | undefined | false;
type AnyElement = Element | Text;

const ownerDocument = (node?: Optional<AnyElement>) => node && node.ownerDocument || document

const isDescendant = (el: Optional<AnyElement>, target: Node): boolean => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

/**
 * Listen for click events that are triggered outside of the component children.
 */
class ClickAwayListener extends React.Component<{
  onClickAway(e: Event): any;
}> {

  handleClickAway = (event: Event) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }
    const el = findDOMNode(this);
    const doc = ownerDocument(el);
    if (
      el &&
      doc.documentElement &&
      doc.documentElement.contains(event.target as any) &&
      !isDescendant(el, event.target as any)
    ) {
      this.props.onClickAway(event);
    }
  };

  render() {
    return (
      <EventListener
        target="document"
        onMouseUp={this.handleClickAway}
        onTouchEnd={this.handleClickAway}
      >
        {this.props.children}
      </EventListener>
    );
  }
}

export default ClickAwayListener;
