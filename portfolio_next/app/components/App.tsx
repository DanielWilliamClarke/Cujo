import React from 'react';
import { Fade } from 'react-awesome-reveal';

import { Post } from '../model/BlogPost';
import { CV as CVModel } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { Copyright } from './backstretch/Copyright';
import { Blog } from './blog/Blog';
import { Contact } from './contact/Contact';
import { NavPanel } from './nav/NavPanel';
import { ThemeProvider } from './theme/ThemeProvider';
import SketchBackstretch from './backstretch/SketchBackstretch';
import CVPreview from './cv/CVPreview';

import './App.scss';

interface AppProps {
  cv: CVModel
  blog: Entries<Post>
  children?: React.ReactNode
}

export const Portfolio: React.FC<AppProps> = ({ cv, blog, children }: AppProps): JSX.Element => {
  return (
    <ThemeProvider>
      <Fade triggerOnce damping={0.01}>
        <SketchBackstretch cv={cv} />
      </Fade>
      <NavPanel />
      <div className="app">
        {children}
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
