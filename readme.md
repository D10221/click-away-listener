# Click Away Listener

Click outside React pointer event listener

### [Lib]("./packages/click-away-listener")

Install

    $ yarn add @d10221/click-away-listener

Usage

```javascript
ReactDOM.render(
  <ClickAwayListener onClickAway={() => alert("Click Away!")}>
    <span id="hello">Hello</span>
  </ClickAwayListener>,
  document.getElementById("root"),
);
```

Notes:

- Requires React 16.x
- Probably won't work on IE
- React/ReactDom are peer dependencies (Preact?)
- Wip (forever)
---

### [Demo]("./packages/demo")
