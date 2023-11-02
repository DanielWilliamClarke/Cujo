/** @jsxImportSource theme-ui */
import dynamic from 'next/dynamic';
import React, { Fragment, ReactNode, Suspense } from 'react';

import { PositionProvider } from '@Hooks/PositionContext';

import { BlockReverseLoading } from '@Common/BlockReverseLoading';

import { Blog } from '@Layouts/Blog';
import { Contact } from '@Layouts/Contact';
import { Copyright } from '@Layouts/Copyright';
import { NavPanel } from '@Layouts/NavPanel';

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
  children?: ReactNode[];
};

export const Portfolio: React.FC<AppProps> = ({
  children = [],
}: AppProps): JSX.Element => {

  const defaultChildren: ReactNode[] = [
    <Blog key="blog" />,
    <Suspense key="cv">
      <CVPreview />
    </Suspense>,
    <Contact key="contact" />,
    <Copyright key="copyright" />,
  ];

  return (
    <Fragment>
      <Suspense>
        <SketchBackstretch />
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
    </Fragment>
  );
};
