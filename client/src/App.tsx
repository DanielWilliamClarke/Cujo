import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { CV } from "./model/CV";
import { NavPanel } from "./nav/NavPanel";

import "./App.css";

type AppProps = {
  cv: CV;
};

class App extends Component<AppProps> {
  render(): JSX.Element {
    return (
      <div>
        <Router>
          <NavPanel></NavPanel>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/blog">
              <About />
            </Route>
            <Route exact path="/contact">
              <Users />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
