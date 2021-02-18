import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StickyContainer, Sticky } from "react-sticky";
import WPAPI from "wpapi";

import { CVProps } from "./model/CV";
import { Backstretch } from "./components/backstretch/Backstretch";
import { NavPanel } from "./components/nav/NavPanel";

import { Profile } from "./components/about/Profile";
import Blog from "./components/blog/Blog";
import { BlogService } from "./components/blog/BlogService";

import "./App.css";

declare global {
  interface Window { _env_: any; }
}

export class App extends Component<CVProps> {
  private bService: BlogService;

  constructor(props: CVProps) {
    super(props);
    this.bService = new BlogService(new WPAPI({
      endpoint: `${window._env_.WORDPRESS_HOST}/wp-json`,
    }));
  }

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
                <Route path="/blog">
                  <Blog service={this.bService} />
                </Route> 
              </Switch>
            </div>
          </Router>
        </StickyContainer>
      </div>
    );
  }
}
