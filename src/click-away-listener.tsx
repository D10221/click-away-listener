/** 
 * source: https://github.com/mui-org/material-ui/blob/v1-beta/src/utils/ClickAwayListener.js
 */

import * as React from "react";
import { findDOMNode } from "react-dom";
import EventListener from "react-event-listener";

import ownerDocument from "dom-helpers/ownerDocument";

const isDescendant = (el: Element, target: Node): boolean => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};

/**
 * Listen for click events that are triggered outside of the component children.
 */
class ClickAwayListener extends React.Component<{
  onClickAway(e: MouseEvent): any;
}> {
  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mounted = false;

  handleClickAway = (event: MouseEvent) => {
    // Ignore events that have been `event.preventDefault()` marked.
    if (event.defaultPrevented) {
      return;
    }

    // IE11 support, which trigger the handleClickAway even after the unbind
    if (this.mounted) {
      const el = findDOMNode(this);
      const doc = ownerDocument(el);

      if (
        doc.documentElement &&
        doc.documentElement.contains(event.target as any) &&
        !isDescendant(el, event.target as any)
      ) {
        this.props.onClickAway(event);
      }
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
