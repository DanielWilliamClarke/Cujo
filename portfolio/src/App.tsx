import React from "react";
import { Fade } from "react-awesome-reveal";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";

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
import { Entries } from "./model/Includes";
import { BlockReverseLoading } from "./components/shared/BlockReverseLoading";

import "./App.scss";

type AppProps = {
  cv: CV | undefined;
  blog: Entries<Post> | undefined;
};

type BlogRouteParams = { id: string };

class App extends React.Component<AppProps & RouteComponentProps> {
  render(): JSX.Element {
    return !this.props?.cv ? this.displayLoading() : this.displayApp();
  }

  private displayLoading(): JSX.Element {
    return (
      <BlockReverseLoading
        style={{
          height: "100vh",
          width: "auto",
        }}
        box={{
          speed: 3,
          size: 50,
        }}
      />
    );
  }

  private displayApp(): JSX.Element {
    return (
      <>
        <Fade triggerOnce damping={0.01}>
          <SketchBackstretch cv={this.props.cv!} />
        </Fade>
        <NavPanel />
        <SharePanel
          url={window.location.href}
          body="Software Engineer Portfolio and Blog"
          hashtag="DCTechPortfolio"
        />
        <div className="app">
          <Switch>
            <Route exact path="/">
              <Profile cv={this.props.cv!} />
            </Route>
            <Route path={"/blog/:id"}>
              {({ match }: RouteComponentProps<BlogRouteParams>): JSX.Element =>
                this.props.blog ? (
                  <BlogPost id={match.params.id} blog={this.props.blog} />
                ) : (
                  <></>
                )
              }
            </Route>
          </Switch>
          {this.props.blog && <Blog blog={this.props.blog} />}
          <footer id="footer">
            <Contact profiles={this.props.cv!.about.entry.profiles} />
            <Copyright />
          </footer>
        </div>
      </>
    );
  }
}

export default withRouter(App);
