import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";

import { CVProps } from "./model/CV";
import { NavPanel } from "./nav/NavPanel";
import { Home } from "./home/Home";

import "./App.css";
class App extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        <Router>
          <div className="Backstretch">
            <div>
              <div className="Backstretch-main">{this.props.cv.basics.name}</div>
              <div className="Backstretch-tag">{this.props.cv.basics.label}</div>
            </div>
          </div>

          <StickyContainer>
            <Sticky>
              {({ style }) => <NavPanel style={style}></NavPanel>}
            </Sticky>
            <div className="App">
              <Switch>
                <Route exact path="/">
                  <Home cv={this.props.cv} />
                </Route>
                <Route exact path="/blog">
                  <About />
                </Route>
                <Route exact path="/contact">
                  <Users />
                </Route>
              </Switch>
            </div>
          </StickyContainer>
        </Router>
      </div>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
