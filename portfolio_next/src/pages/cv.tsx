/** @jsxImportSource theme-ui */
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { wrapPage } from '@Cujo/Cujo';
import { fetchCujoProps } from '@Cujo/CujoISR';

import { BlockReverseLoading } from '@Common/BlockReverseLoading';

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

const CVExport = dynamic(() => import('@Layouts/CVExport'), {
  ssr: false,
  loading: () => loading,
});

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage((): JSX.Element => (
  <Suspense>
    <CVExport />
  </Suspense>
));
