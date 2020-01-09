import React, { FunctionComponent, useEffect, useState } from "react";
import { findDOMNode } from "react-dom";

type Optional<T> = T | null | undefined | false;

/** */
interface Props {
  /**
   * 
   * @param e {PointerEvent}  Owner document pointerup event 
   */
  onClickAway(e: PointerEvent): any; // void|Promise<any>
}

const ownerDocument = (node?: Optional<Element | Text>) => node && node.ownerDocument || document

const isDescendant = (el: Optional<Element | Text>, target: Node): boolean => {
  if (target !== null && target.parentNode) {
    return el === target || isDescendant(el, target.parentNode);
  }
  return false;
};
/**
 * Listen for pointerup events outside of the component children.
 */
const ClickAwayListener: FunctionComponent<Props> = ({ onClickAway, children }) => {
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
    const handle = (event: PointerEvent) => {
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
    }

    owner.addEventListener("pointerup", (handle));
    /** Unsubscribe */
    return () => owner.removeEventListener("pointerup", handle);
  }
  /**
   * set local ref and bubble up ....
   * @param value 
   */
  function setRef(value: Optional<Element>): void {
    if (xref) xref(value);
    _setRef(value);
  }
  /** subscribe/unsubscibe on e/render */
  useEffect(() => (ref) && subscribe(ref) || undefined)

  const onlyChildren = React.Children.only(children);
  if (!React.isValidElement(onlyChildren)) {
    console.warn("Children: !isValidElement: ", onlyChildren);
    return null;
  }
  const { ref: xref, ...props } = onlyChildren.props as any;
  return React.cloneElement(onlyChildren, { ...props, ref: setRef });
}

export default ClickAwayListener;
