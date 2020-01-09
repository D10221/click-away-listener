/**
 * source: https://github.com/mui-org/material-ui/blob/v1-beta/src/utils/ClickAwayListener.spec.js
 * reduced and tweeked
 */
import React from "react";
import ReactDOM from "react-dom";
import ClickAwayListener from "../src";

describe("<ClickAwayListener />", () => {
  /** */
  it("should render the children", async () => {
    const body = document.createElement("div");
    const ref = await new Promise<any>((resolve, reject) => {
      try {
        ReactDOM.render(
          <ClickAwayListener 
            eventType="mouseup" // jsdom can't see pointerup
            onClickAway={() => {}}>
            <span ref={resolve} id="hello">
              Hello
            </span>
          </ClickAwayListener>,
          body,
        );
      } catch (error) {
        reject(error);
      }
    });
    expect((ReactDOM.findDOMNode(ref) as Element).id).toBe("hello");
  });
  /** */
  describe("prop: onClickAway", () => {
    /** */
    it("should be call when clicking away", async () => {
      let clicks = 0;
      const root = document.createElement("div");
      document.body.appendChild(root);
      const el = await new Promise<any>(resolve => {
        ReactDOM.render(
          <ClickAwayListener
            eventType="mouseup" // jsdom can't see pointerup
            onClickAway={() => clicks++}
          >
            <span id="hello" ref={resolve}>
              Hello
            </span>
          </ClickAwayListener>,
          root,
        );
      });
      expect(el.id).toBe("hello");
      _dispatchEvent(document.body);
      expect(clicks).toBe(1);
    });
    /** */
    it("should not be call when clicking inside", async () => {
      let clicks = 0;
      const body = document.createElement("div");
      let el = await new Promise<any>((resolve, reject) => {
        try {
          ReactDOM.render(
            <ClickAwayListener
              eventType="mouseup" // jsdom can't see pointerup
              onClickAway={() => clicks++}
            >
              <span ref={resolve} id="hello">
                Hello
              </span>
            </ClickAwayListener>,
            body,
          );
        } catch (error) {
          reject(error);
        }
      });
      expect(el.id).toBe("hello");
      _dispatchEvent(el);
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
        <ClickAwayListener
          eventType="mouseup" // jsdom can't see pointerup
          onClickAway={handleClickAway}
        >
          <ClickAwayListener
            eventType="mouseup" // jsdom can't see pointerup
            onClickAway={(event: any) => event.preventDefault()}
          >
            <span>Hello</span>
          </ClickAwayListener>
        </ClickAwayListener>,
        body,
      );
      _dispatchEvent(window.document.body);
      expect(clicks).toBe(0);
    });
  });
});

function _dispatchEvent(el: any) {
  const event = document.createEvent("MouseEvents");
  event.initEvent("mouseup", true, true);
  el.dispatchEvent(event);
}
