import { Component } from "react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";
import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { CVProps } from "./model/CVModel";
import NavPanel from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";
import { Profile } from "./components/Profile";
import { Blog } from "./components/blog/Blog";
import { BlogPost } from "./components/blog/BlogPost";
import { Contact } from "./components/contact/Contact";
import { SharePanel } from "./components/nav/SharePanel";

import "./App.scss";

type BlogRouteParams = { id: string };

class App extends Component<CVProps & RouteComponentProps> {
  render(): JSX.Element {
    return (
      <div>
        <SketchBackstretch cv={this.props.cv} />
        <NavPanel />
        <SharePanel
          url={window.location.href}
          body="Software Engineer Portfolio and Blog"
          hashtag="DCTechPortfolio"
        />
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Profile cv={this.props.cv} />
            </Route>
            <Route
              path={"/blog/:id"}
              children={({
                match,
              }: RouteComponentProps<BlogRouteParams>): JSX.Element => (
                <BlogPost id={parseInt(match.params.id)} />
              )}
            />
          </Switch>
          <Blog />
          <footer id="footer">
            <Contact profiles={this.props.cv.basics.profiles} />
            <Copyright />
          </footer>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
