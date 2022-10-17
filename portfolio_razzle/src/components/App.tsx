import React from 'react';
import { Fade } from 'react-awesome-reveal';
import {
  Route,
  RouteComponentProps,
  Switch
} from 'react-router-dom';

import { Post } from '../model/BlogPost';
import { CV as CVModel } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { Copyright } from './backstretch/Copyright';
import { Blog } from './blog/Blog';
import { Contact } from './contact/Contact';
import { NavPanel } from './nav/NavPanel';
import { ThemeProvider } from './theme/ThemeProvider';

import './App.scss';
import loadable from '@loadable/component';

const BlogPost = loadable(async () => await import(/* webpackChunkName: "BlogPost" */ './blog/BlogPost'));
const Profile = loadable(async () => await import(/* webpackChunkName: "Profile" */ './profile/Profile'));
const CVPreview = loadable(async () => await import(/* webpackChunkName: "CVPreview" */ './cv/CVPreview'));
const SketchBackstretch = loadable(async () => await import(/* webpackChunkName: "SketchBackstretch" */ './backstretch/SketchBackstretch'));

interface AppProps {
  cv: CVModel
  blog: Entries<Post>
}

interface BlogRouteParams { id: string }

export const Portfolio: React.FC<AppProps> = ({ cv, blog }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <Fade triggerOnce damping={0.01}>
        <SketchBackstretch cv={cv} />
      </Fade>
      <NavPanel />
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Profile cv={cv} />
          </Route>
          <Route path={'/blog/:id'}>
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
    </ThemeProvider>
  );
};

export default Portfolio;
