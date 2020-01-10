import ClickAway from "@d10221/click-away-listener";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import logo from "./logo.svg";
import * as serviceWorker from "./serviceWorker";

const repoUrl = "https://github.com/D10221/click-away-listener";
const issuesUrl = "https://github.com/D10221/click-away-listener/issues";

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

function App() {
  const [{ away }, setState] = useState({ away: {} });
  function onClickAway(id) {
    return _ => {
      setState({
        away: {
          ...away,
          [id]: true,
        },
      });
      setTimeout(
        () =>
          setState({
            away: {
              ...away,
              [id]: false,
            },
          }),
        500,
      );
    };
  }
  function onClick() {
    setState({
      away,
    });
  }
  function getColor(key) {
    return away && away[key] ? "red" : "unset";
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
            onClick={onClick}
            className="container"
            style={{
              color: getColor("one"),
            }}
          >
            <img src={logo} className="logo" alt="logo" width="150px" />
            <span>One</span>
          </div>
        </ClickAway>
        <ClickAway onClickAway={onClickAway("two")}>
          <div
            id="two"
            onClick={onClick}
            className="container"
            style={{
              color: getColor("two"),
            }}
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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
