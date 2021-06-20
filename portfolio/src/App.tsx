import { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { CVProps } from "./model/CVModel";
import { NavPanel } from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";

import { Profile } from "./components/profile/Profile";
import Blog from "./components/blog/Blog";
import { BlogService } from "./components/blog/BlogService";

import "./App.scss";

export class App extends Component<CVProps> {
  private bService: BlogService;

  constructor(props: CVProps) {
    super(props);
    this.bService = new BlogService();
  }

  render(): JSX.Element {
    return (
      <div>
        <SketchBackstretch cv={this.props.cv}></SketchBackstretch>
        <Router>
          <NavPanel></NavPanel>
          <div className="app">
            <Switch>
              <Route exact path="/">
                <Profile cv={this.props.cv} />
              </Route>
              <Route path="/blog">
                <Blog service={this.bService} />
              </Route>
            </Switch>
            <footer id="footer">
              <Copyright />
            </footer>
          </div>
        </Router>
      </div>
    );
  }
}
