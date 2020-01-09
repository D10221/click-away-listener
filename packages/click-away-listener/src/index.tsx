import React, { FunctionComponent, useEffect, useState } from "react";
import { findDOMNode } from "react-dom";
/** */
type Optional<T> = T | null | undefined | false;
/** */
interface Props {
  /**
   *
   * @param e {PointerEvent}  Owner document pointerup event
   */
  onClickAway(e: Event): any; // void|Promise<any>
  eventType?: "pointerup" | "mouseup" | undefined;
}

const ownerDocument = (node?: Optional<Element | Text>) =>
  (node && node.ownerDocument) || document;

const isDescendant = (el: Optional<Element | Text>, target: Node): boolean => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};
/**
 * Listen for pointerup events outside of the component children.
 */
const ClickAwayListener: FunctionComponent<Props> = ({
  onClickAway,
  children,
  /** jsdom can't see pointerup */
  eventType = "pointerup",
}) => {
  const [ref, _setRef] = useState<Optional<Element>>(undefined);
  /**
   * @description addEventListener to owner document
   * @returns {()=> any} Unsubscribe
   */
  function subscribe(ref: Element) {
    const owner = ownerDocument(ref);
    /**
     * Handle Event
     * @param event
     */
    const handle = (event: Event) => {
      if (event.defaultPrevented) return;
      const el = findDOMNode(ref);
      const doc = ownerDocument(el);
      if (
        doc &&
        doc.documentElement &&
        doc.documentElement.contains(event.target as any) &&
        !isDescendant(el, event.target as any)
      ) {
        onClickAway(event);
      }
    };

    owner.addEventListener(eventType, handle);
    /** Unsubscribe */
    return () => owner.removeEventListener(eventType, handle);
  }
  /** subscribe/unsubscibe on e/render */
  useEffect(() => (ref && subscribe(ref)) || undefined);

  const onlyChildren = React.Children.only(children);
  if (!React.isValidElement(onlyChildren)) {
    console.warn("Children: !isValidElement: ", onlyChildren);
    return null;
  }
  return React.cloneElement(onlyChildren, {
    ...onlyChildren.props,
    /**
     * set local ref and bubble up ....
     * @param value
     */
    ref: function setRef(value: Optional<Element>): void {
      _setRef(value);
      if (hasRef(onlyChildren)) onlyChildren.ref(value);
    },
  });
};
function hasRef(x: any): x is { ref: Function } {
  return x && typeof (x as any).ref === "function";
}

export default ClickAwayListener;
