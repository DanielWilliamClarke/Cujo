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
import { CV } from "./model/CVModel";
import { ContentfulEntries } from "./model/ContentfulEntries";
import NavPanel from "./components/nav/NavPanel";
import { Copyright } from "./components/backstretch/Copyright";
import { Profile } from "./components/Profile";
import { Blog } from "./components/blog/Blog";
import { BlogPost } from "./components/blog/BlogPost";
import { Contact } from "./components/contact/Contact";
import { SharePanel } from "./components/nav/SharePanel";

import "./App.scss";

export type AppState = {
  cv: CV | undefined;
  blog: ContentfulEntries | undefined;
};

type BlogRouteParams = { id: string };

class App extends Component<RouteComponentProps, AppState> {
  @resolve("CujoService") private readonly cujoService!: ICujoService;
  async componentWillMount() {
    this.setState({ cv: undefined, blog: undefined });
    this.setState({
      cv: await this.cujoService.FetchCV(),
      blog: await this.cujoService.FetchBlogPosts(),
    });
  }

  render(): JSX.Element {
    return (
      <>
        {" "}
        {this.state.cv && (
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
                  }: RouteComponentProps<BlogRouteParams>): JSX.Element =>
                    this.state.blog ? (
                      <BlogPost id={match.params.id} blog={this.state.blog} />
                    ) : (
                      <></>
                    )
                  }
                />
              </Switch>
              {this.state.blog && <Blog blog={this.state.blog} />}
              <footer id="footer">
                <Contact profiles={this.state.cv.basics.profiles} />
                <Copyright />
              </footer>
            </div>
          </>
        )}{" "}
      </>
    );
  }
}

export default withRouter(App);
