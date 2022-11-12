
import { Provider } from 'inversify-react';
import { initUrqlClient, withUrqlClient } from 'next-urql';
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';

import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { useQuery } from 'urql';
import { CujoBlogPathsQuery, CujoQuery } from './CujoQuery';
import { container } from './ioc';
import { Post } from './model/BlogPost';
import { CV } from './model/CVModel';
import { Entries } from './model/Includes';

export type CujoProps = {
  cv: CV
  blog: Entries<Post>
}

export type CujoBlogPaths = {
  blog: Entries<{ id: string }>
}

const url = `${process.env.CUJO_SERVICE_URL}/graphql`

export const fetchCujoProps: GetStaticProps = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange
      ],
    },
    false
  );

  if (!client) {
    throw new Error('Client could not be initialised');
  }

  await client.query(
    CujoQuery,
    {}
  ).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
    revalidate: 300
  };
};

export const fetchCujoBlogPaths: GetStaticPaths = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url,
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange
      ],
    },
    false
  );

  if (!client) {
    throw new Error('Client could not be initialised');
  }

  const { data, error } = await client.query<CujoBlogPaths>(
    CujoBlogPathsQuery,
    {}
  ).toPromise();

  if (!data || error) {
    throw error;
  }

  const { entries } = data.blog;
  return {
    paths: entries.map(({ id: pid }) => ({ params: { pid } })),
    fallback: true,
  }
};

type CujoProviderProps = {
  children: (props: CujoProps) => JSX.Element
};

const CujoProvider: React.FC<CujoProviderProps> = ({ children }: CujoProviderProps): JSX.Element => {
  const [{ data, error }] = useQuery<CujoProps>({ query: CujoQuery });

  if (!data || error) {
    throw error;
  }

  return (
    <Provider container={container}>
      {children(data)}
    </Provider>
  )
}

const buildComponent = (children: (props: CujoProps) => JSX.Element): React.FC => {
  return () => (
    <CujoProvider>
      {children}
    </CujoProvider>
  )
}

export const wrapComponent = (children: (props: CujoProps) => JSX.Element) => withUrqlClient(
  () => ({ url }),
)(buildComponent(children));