import React from "react";
import { Fade } from "react-awesome-reveal";
import {
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";

import { Copyright } from "./backstretch/Copyright";
import { SketchBackstretch } from "./backstretch/SketchBackstretch";
import { Blog } from "./blog/Blog";
import { Contact } from "./contact/Contact";
import { NavPanel } from "./nav/NavPanel";
import { Post } from "../model/BlogPost";
import { CV as CVModel } from "../model/CVModel";
import { Entries } from "../model/Includes";

import "./App.scss";
import CVPreview from "./cv/CVPreview";

const BlogPost = React.lazy(
  () => import(/* webpackChunkName: "BlogPost" */ "./blog/BlogPost")
);
const Profile = React.lazy(
  () => import(/* webpackChunkName: "Profile" */ "./profile/Profile")
);

type AppProps = {
  cv: CVModel;
  blog: Entries<Post>;
};

type BlogRouteParams = { id: string };

export const Portfolio: React.FC<AppProps> = ({ cv, blog }: AppProps): JSX.Element => {
  return (
    <>
      <Fade triggerOnce damping={0.01}>
        <SketchBackstretch cv={cv} />
      </Fade>
      <NavPanel />
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Profile cv={cv} />
          </Route>
          <Route path={"/blog/:id"}>
            {({ match }: RouteComponentProps<BlogRouteParams>): JSX.Element =>
              <BlogPost id={match.params.id} blog={blog} />
            }
          </Route>
        </Switch>
        <Blog blog={blog} />
        <CVPreview cv={cv} />
        <footer id="footer">
          <Contact profiles={cv.about.entry.profiles} />
          <Copyright name={cv.about.entry.name}/>
        </footer>
      </div>
    </>
  );
};

export default Portfolio;
