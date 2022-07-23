import React from "react";
import { Fade } from "react-awesome-reveal";
import {
  Route,
  RouteComponentProps,
  Switch
} from "react-router-dom";

import { Copyright } from "./components/backstretch/Copyright";
import { SketchBackstretch } from "./components/backstretch/SketchBackstretch";
import { Blog } from "./components/blog/Blog";
import { BlogPost } from "./components/blog/BlogPost";
import { Contact } from "./components/contact/Contact";
import { NavPanel } from "./components/nav/NavPanel";
import { Profile } from "./components/Profile";
import { Post } from "./model/BlogPost";
import { CV as CVModel } from "./model/CVModel";
import { Entries } from "./model/Includes";

import "./App.scss";

const CVPreview = React.lazy(
  () => import(/* webpackChunkName: "CVPreview" */ "./components/cv/CVPreview")
);
const CVExport = React.lazy(
  () => import(/* webpackChunkName: "CVExport" */ "./components/cv/CVExport")
);

type AppProps = {
  cv: CVModel;
  blog: Entries<Post>;
};

type BlogRouteParams = { id: string };

export const App: React.FC<AppProps> = ({ cv, blog }: AppProps): JSX.Element => {
  return (
    <Switch>
      <Route exact path="/cv">
        <CVExport cv={cv} />
      </Route>
      <Route exact path="/*">
        <Portfolio cv={cv} blog={blog} />
      </Route>
    </Switch>
  )
};

const Portfolio: React.FC<AppProps> = ({ cv, blog }: AppProps): JSX.Element => {
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
              blog ? (
                <BlogPost id={match.params.id} blog={blog} />
              ) : (
                <></>
              )
            }
          </Route>
        </Switch>
        {blog && <Blog blog={blog} />}
        <CVPreview cv={cv} />
        <footer id="footer">
          <Contact profiles={cv.about.entry.profiles} />
          <Copyright name={cv.about.entry.name}/>
        </footer>
      </div>
    </>
  );
};

export default App;
