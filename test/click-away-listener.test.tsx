/**
 * source: https://github.com/mui-org/material-ui/blob/v1-beta/src/utils/ClickAwayListener.spec.js
 * reduced and tweeked 
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { findDOMNode } from "react-dom";
import ClickAwayListener from "../src";

describe("<ClickAwayListener />", () => {
  /** */
  it("should render the children", () => {
    const children = <span id="hello">Hello</span>;
    let el: any;
    const body = document.createElement("div");

    ReactDOM.render(
      <ClickAwayListener
        ref={x => el = findDOMNode(x)}
        onClickAway={() => { }}>{children}</ClickAwayListener>,
      body,
    );
    expect(el.id).toBe("hello");
  });
  /** */
  describe("prop: onClickAway", () => {
    /** */
    it("should be call when clicking away", () => {
      let clicks = 0;
      let e: any;
      const handleClickAway = (_event: any) => {
        e = event;
        clicks++;
      };
      const body = document.createElement("div");
      ReactDOM.render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <span>Hello</span>
        </ClickAwayListener>,
        body,
      );
      const event = document.createEvent("MouseEvents");
      event.initEvent("mouseup", true, true);
      window.document.body.dispatchEvent(event);

      expect(clicks).toBe(1);
      expect(e).toEqual(event);
    });
    /** */
    it("should not be call when clicking inside", () => {
      let clicks = 0;
      const handleClickAway = (_event: any) => {
        clicks++;
      };
      const body = document.createElement("div");
      let el: any;
      ReactDOM.render(
        <ClickAwayListener
          onClickAway={handleClickAway}
        >
          <span
            ref={x => {
              el = x;
            }}
            id="hello">Hello</span>
        </ClickAwayListener>,
        body,
      );
      const event = document.createEvent("MouseEvents");
      event.initEvent("mouseup", true, true);
      expect(el.id).toBe("hello")
      el.dispatchEvent(event);
      expect(clicks).toBe(0);
    });
    /** */
    it("should not be call when defaultPrevented", () => {
      let clicks = 0;
      const handleClickAway = (_event: any) => {
        clicks++;
      };
      const body = document.createElement("div");
      ReactDOM.render(
        <ClickAwayListener onClickAway={handleClickAway}>
          <ClickAwayListener onClickAway={event => event.preventDefault()}>
            <span>Hello</span>
          </ClickAwayListener>
        </ClickAwayListener>,
        body,
      );

      const event = document.createEvent("MouseEvents");
      event.initEvent("mouseup", true, true);
      window.document.body.dispatchEvent(event);
      expect(clicks).toBe(0);
    });
  });
});
