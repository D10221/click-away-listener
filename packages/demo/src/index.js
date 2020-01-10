import ClickAway from "@d10221/click-away-listener";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
/** */
const repoUrl = "https://github.com/D10221/click-away-listener";
/** */
const issuesUrl = "https://github.com/D10221/click-away-listener/issues";
const logo = "./logo.svg";

/** */
function classNames(...names) {
  return names.filter(Boolean).join(" ");
}
/** */
const Icon = ({ label, value }) => (
  <span
    className="icon"
    role="img"
    aria-label={label || ""}
    aria-hidden={!Boolean(label)}
  >
    {value}
  </span>
);
/** */
function App() {
  const [away, setAway] = useState({});
  const back = {};
  /** */
  function onClickAway(id) {
    return _ => {
      // ...buffering 
      Object.assign(away, { [id]: true });
      Object.assign(back, { [id]: false });
      function blink() {
        setAway({ ...away });
        setTimeout(() => setAway(back), 500)
      }
      setTimeout(blink, 10);

    };
  }
  return (
    <>
      <header>
        <nav>
          <a href={repoUrl}><h1 className="header-title">Click Away Listener</h1></a>
        </nav>
      </header>
      <main>
        <ClickAway onClickAway={onClickAway("one")}>
          <div
            id="one"
            className={classNames("container", away.one && "away")}
          >
            <img src={logo} className="logo" alt="logo" width="150px" />
            <span>One</span>
          </div>
        </ClickAway>
        <ClickAway onClickAway={onClickAway("two")}>
          <div
            id="two"
            className={classNames("container", away.two && "away")}
          >
            <img src={logo} className="logo" alt="logo" width="150px" />
            <span>Two</span>
          </div>
        </ClickAway>
        <p>Click Around</p>
      </main>
      <footer>
        <div className="footer-item">
          <Icon label="Feedback" value={"💬"} /><a href={issuesUrl}>Feedback</a>
        </div>
      </footer>
    </>
  );
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.unregister();
