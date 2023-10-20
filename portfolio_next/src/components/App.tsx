/** @jsxImportSource theme-ui */

import React, { Suspense } from 'react';

import { Post } from '../model/BlogPost';
import { CV as CVModel } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { Copyright } from './backstretch/Copyright';
import { Blog } from './blog/Blog';
import { Contact } from './contact/Contact';
import { NavPanel } from './nav/NavPanel';
import { ThemeProvider } from './theme/ThemeProvider';

import dynamic from 'next/dynamic';
import { BlockReverseLoading } from './shared/BlockReverseLoading';
import { GenericComponentProps } from './shared/props';
import { PositionProvider } from './shared/PositionContext';

const loading = (
  <BlockReverseLoading
    sx={{
      height: "100vh",
      width: "auto",
    }}
    box={{
      speed: 3,
      size: 50,
    }}
  />
);

const SketchBackstretch = dynamic(() => import('./backstretch/SketchBackstretch'), {
  ssr: false,
  loading: () => loading
});

const CVPreview = dynamic(() => import('./cv/CVPreview'), {
  ssr: false,
  loading: () => loading
});



type AppProps = {
  cv: CVModel;
  blog: Entries<Post>;
  components?: React.FC[];
}

export const Portfolio: React.FC<AppProps> = ({
  cv,
  blog,
  components = []
}: AppProps): JSX.Element => {
  const baseComponents: React.FC[] = [
    () => (<Blog blog={blog} />),
    () => (<Suspense><CVPreview cv={cv} /></Suspense>),
    () => (<Contact profiles={cv.about.entry.profiles} />),
    () => (<Copyright name={cv.about.entry.name} />),
  ];

  return (
    <ThemeProvider>
      <Suspense>
        <SketchBackstretch cv={cv} />
      </Suspense>
      <NavPanel />
      <div>
        {
          [
            ...components,
            ...baseComponents
          ].map((Component: React.FC, index: number) => (
            <PositionProvider key={index} position={index}>
              <Component />
            </PositionProvider>
          ))
        }
      </div>
    </ThemeProvider >
  )
};