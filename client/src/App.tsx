import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";

import { CVProps } from "./model/CV";
import { NavPanel } from "./components/nav/NavPanel";
import { About } from "./components/about/About";
import { Backstretch } from "./components/backstretch/Backstretch";

import "./App.css";
import { Technical } from "./components/about/Technical";

const Fade = require("react-reveal/Fade");

class App extends Component<CVProps> {
  render(): JSX.Element {
    return (
      <div>
        <Backstretch cv={this.props.cv}></Backstretch>
        <StickyContainer>
          <Router>
            <Sticky>
              {({ style }) => <NavPanel style={style}></NavPanel>}
            </Sticky>
            <div className="App">
              <Switch>
                <Route exact path="/">
                  <Fade bottom>
                    <About cv={this.props.cv} />
                  </Fade>
                  <Fade bottom>
                    <Technical cv={this.props.cv} />
                  </Fade>
                </Route>
              </Switch>
            </div>
          </Router>
        </StickyContainer>
      </div>
    );
  }
}
export default App;
