import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import ClickAway from "@d10221/click-away-listener";

function App() {
  const [state, setState] = useState({});
  function onClickAway(id) {
    return (w) => console.log("Click Awayy! %s", id);
  }
  return (
    <div className="App">
      <header className="App-header">
        <ClickAway onClickAway={onClickAway("one")}>
          <div id="one" onClick={() => {
            setState({ ok: !state.ok })
          }} style={{ display: "flex", flexDirection: "column" }}>
            <img src={logo} className="App-logo" alt="logo" width="150px" />
            <span>One</span>
          </div>
        </ClickAway>
        <ClickAway onClickAway={onClickAway("two")}>
          <div id="two" onClick={() => {
            setState({ ok: !state.ok })
          }} style={{ display: "flex", flexDirection: "column" }}>
            <img src={logo} className="App-logo" alt="logo" width="150px" />
            <span>Two</span>
          </div>
        </ClickAway>
        <p>
          Click Aorund
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
