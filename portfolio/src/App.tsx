import { Component, Fragment } from "react";
import { Switch, Route, RouteComponentProps, withRouter } from "react-router-dom";
import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { CVProps } from "./model/CVModel";
import { NavPanel } from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";
import { Profile } from "./components/Profile";
import { BlogServiceProps } from "./components/blog/BlogService";
import { BlogPost } from "./components/blog/BlogPost";

import "./App.scss";
import { Nav } from "react-bootstrap";

type BlogRouteParams = { id: string };

class App extends Component<CVProps & RouteComponentProps & BlogServiceProps> {
  render(): JSX.Element {
    return (
      <div>
        <SketchBackstretch cv={this.props.cv}></SketchBackstretch>
        <NavPanel></NavPanel>
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Profile cv={this.props.cv} service={this.props.service} />
            </Route>
            <Route
              path={"/blog/:id"}
              children={({ match }: RouteComponentProps<BlogRouteParams>): JSX.Element => 
                <BlogPost service={this.props.service} id={parseInt(match.params.id)} />} />
          </Switch>
          <footer id="footer">
            <Copyright />
          </footer>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
