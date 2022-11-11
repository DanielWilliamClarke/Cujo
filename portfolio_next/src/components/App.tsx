import React, { Suspense } from 'react';
import { Fade } from 'react-awesome-reveal';

import { Post } from '../model/BlogPost';
import { CV as CVModel } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { Copyright } from './backstretch/Copyright';
import { Blog } from './blog/Blog';
import { Contact } from './contact/Contact';
import { NavPanel } from './nav/NavPanel';
import { ThemeProvider } from './theme/ThemeProvider';

import './App.module.scss';
import dynamic from 'next/dynamic';
import { BlockReverseLoading } from './shared/BlockReverseLoading';

const SketchBackstretch = dynamic(() => import('./backstretch/SketchBackstretch'), {
  ssr: false,
})

const CVPreview = dynamic(() => import('./cv/CVPreview'), {
  ssr: false,
})

const loading = (
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

type AppProps = {
  cv: CVModel
  blog: Entries<Post>
  children?: React.ReactNode
}

export const Portfolio: React.FC<AppProps> = ({ cv, blog, children }: AppProps): JSX.Element => (
  <ThemeProvider>
    <Suspense fallback={loading}>
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
          <Copyright name={cv.about.entry.name} />
        </footer>
      </div>
    </Suspense>
  </ThemeProvider>
);

export default Portfolio;
