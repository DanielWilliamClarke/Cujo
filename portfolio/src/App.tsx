import { resolve } from "inversify-react";
import { Component } from "react";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import "./App.scss";
import { Copyright } from "./components/backstretch/Copyright";
import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { Blog } from "./components/blog/Blog";
import { BlogPost } from "./components/blog/BlogPost";
import { Contact } from "./components/contact/Contact";
import NavPanel from "./components/nav/NavPanel";
import { SharePanel } from "./components/nav/SharePanel";
import { Profile } from "./components/Profile";
import { Post } from "./model/BlogPost";
import { CV } from "./model/CVModel";
import { ICujoService } from "./services/CujoService";

export type AppState = {
  cv: CV | undefined;
  blog: Post[] | undefined;
};

type BlogRouteParams = { id: string };

class App extends Component<RouteComponentProps, AppState> {
  @resolve("CujoService") private readonly cujoService!: ICujoService;

  async componentDidMount() {
    this.setState({
      cv: await this.cujoService.FetchCV(),
      blog: await this.cujoService.FetchBlogPosts(),
    });
  }

  render(): JSX.Element {
    if (!this.state?.cv) {
      return <></>;
    }

    return (
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
    );
  }
}

export default withRouter(App);
