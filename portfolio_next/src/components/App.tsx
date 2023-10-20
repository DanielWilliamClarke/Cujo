/** @jsxImportSource theme-ui */

import React, { ReactNode, Suspense } from 'react';

import { Post } from '../model/BlogPost';
import { CV as CVModel } from '../model/CVModel';
import { Entries } from '../model/Includes';
import { Copyright } from './Copyright';
import { Blog } from './Blog';
import { Contact } from './Contact';
import { NavPanel } from './NavPanel';
import { ThemeProvider } from './theme/ThemeProvider';

import dynamic from 'next/dynamic';
import { BlockReverseLoading } from './BlockReverseLoading';
import { PositionProvider } from './hooks/PositionContext';

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

const SketchBackstretch = dynamic(() => import('./SketchBackstretch'), {
  ssr: false,
  loading: () => loading
});

const CVPreview = dynamic(() => import('./CVPreview'), {
  ssr: false,
  loading: () => loading
});

type AppProps = {
  cv: CVModel;
  blog: Entries<Post>;
  children?: ReactNode[];
}

export const Portfolio: React.FC<AppProps> = ({
  cv,
  blog,
  children = []
}: AppProps): JSX.Element => {
  const defaultChildren: ReactNode[] = [
    <Blog blog={blog} />,
    <Suspense><CVPreview cv={cv} /></Suspense>,
    <Contact profiles={cv.about.entry.profiles} />,
    <Copyright name={cv.about.entry.name} />,
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
            ...children,
            ...defaultChildren
          ].map((children: ReactNode, index: number) => (
            <PositionProvider key={index} position={index}>
              {children}
            </PositionProvider>
          ))
        }
      </div>
    </ThemeProvider >
  )
};