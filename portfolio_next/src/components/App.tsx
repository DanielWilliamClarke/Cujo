/** @jsxImportSource theme-ui */

import React, { ReactNode, Suspense } from 'react';

import { Blog } from '@Layouts/Blog';
import { Contact } from '@Layouts/Contact';
import { Copyright } from '@Layouts/Copyright';
import { NavPanel } from '@Layouts/NavPanel';
import { Post } from '@Models/BlogPost';
import { CV as CVModel } from '@Models/CVModel';
import { Entries } from '@Models/Includes';
import { ThemeProvider } from './theme/ThemeProvider';

import { BlockReverseLoading } from '@Common/BlockReverseLoading';
import { PositionProvider } from '@Hooks/PositionContext';
import dynamic from 'next/dynamic';

const loading = (
  <BlockReverseLoading
    sx={{
      height: '100vh',
      width: 'auto',
    }}
    box={{
      speed: 3,
      size: 50,
    }}
  />
);

const SketchBackstretch = dynamic(() => import('@Layouts/SketchBackstretch'), {
  ssr: false,
  loading: () => loading,
});

const CVPreview = dynamic(() => import('@Layouts/CVPreview'), {
  ssr: false,
  loading: () => loading,
});

type AppProps = {
  cv: CVModel;
  blog: Entries<Post>;
  children?: ReactNode[];
};

export const Portfolio: React.FC<AppProps> = ({
  cv,
  blog,
  children = [],
}: AppProps): JSX.Element => {
  const defaultChildren: ReactNode[] = [
    <Blog blog={blog} />,
    <Suspense>
      <CVPreview cv={cv} />
    </Suspense>,
    <Contact profiles={cv.about.entry.profiles} />,
    <Copyright name={cv.about.entry.name} />,
  ];

  return (
    <ThemeProvider>
      <Suspense>
        <SketchBackstretch cv={cv} />
      </Suspense>
      <NavPanel />
      <div
        sx={{
          textAlign: 'center',
        }}
      >
        {[...children, ...defaultChildren].map(
          (children: ReactNode, index: number) => (
            <PositionProvider key={index} position={index}>
              {children}
            </PositionProvider>
          ),
        )}
      </div>
    </ThemeProvider>
  );
};
