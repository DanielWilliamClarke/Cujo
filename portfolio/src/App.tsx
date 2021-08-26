import { Component } from "react";
import { resolve } from "inversify-react";
import {
  Switch,
  Route,
  RouteComponentProps,
  withRouter,
} from "react-router-dom";

import { ICujoService } from "./services/CujoService";
import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { CVState } from "./model/CVModel";
import NavPanel from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";
import { Profile } from "./components/Profile";
import { Blog } from "./components/blog/Blog";
import { BlogPost } from "./components/blog/BlogPost";
import { Contact } from "./components/contact/Contact";
import { SharePanel } from "./components/nav/SharePanel";

import "./App.scss";

type BlogRouteParams = { id: string };
class App extends Component<RouteComponentProps, CVState> {
  @resolve("CujoService") private readonly cujoService!: ICujoService;
  async componentWillMount() {
    this.setState({ cv: undefined });
    this.setState({ cv: await this.cujoService.FetchCV() });
  }

  render(): JSX.Element {
    return <> {
      this.state.cv &&
      <>
        <SketchBackstretch cv={this.state.cv} />
        <NavPanel />
        <SharePanel
          url={window.location.href}
          body="Software Engineer Portfolio and Blog"
          hashtag="DCTechPortfolio"
        />
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Profile cv={this.state.cv} />
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
            <Contact profiles={this.state.cv.basics.profiles} />
            <Copyright />
          </footer>
        </div>
      </>
    } </>;
  }
}

export default withRouter(App);
