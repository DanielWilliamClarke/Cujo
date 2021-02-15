import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";

import { CVProps } from "./model/CV";
import { Backstretch } from "./components/backstretch/Backstretch";
import { NavPanel } from "./components/nav/NavPanel";

import { Profile } from "./components/about/Profile";
import { Blog } from "./components/blog/Blog";

import "./App.css";

export class App extends Component<CVProps> {
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
                  <Profile cv={this.props.cv} />
                </Route>
                <Route exact path="/blog">
                  <Blog />
                </Route>
              </Switch>
            </div>
          </Router>
        </StickyContainer>
      </div>
    );
  }
}
