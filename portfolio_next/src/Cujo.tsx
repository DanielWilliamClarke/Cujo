
import { initUrqlClient, SSRData, withUrqlClient } from 'next-urql';
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { Provider } from 'inversify-react';

import React, { Fragment } from 'react';
import { useQuery } from 'urql';
import { CujoQuery } from './CujoQuery';
import { Post } from './model/BlogPost';
import { CV } from './model/CVModel';
import { Entries } from './model/Includes';
import { container } from './ioc';

export type CujoProps = {
  cv: CV
  blog: Entries<Post>
}

export type URQLStateProps = {
  props: {
    urqlState: SSRData
  }
}

const url = `${process.env.CUJO_SERVICE_URL}/graphql`

export const fetchCujo = async (): Promise<URQLStateProps> => {
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

  // This query is used to populate the cache for the query
  // used on this page.
  await client.query(CujoQuery, {}).toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
    },
  };
};

type CujoProviderProps = {
  children: (props: CujoProps) => JSX.Element
};

export const CujoProvider: React.FC<CujoProviderProps> = ({ children }: CujoProviderProps): JSX.Element => {
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

export const wrapComponent = (component: React.FC) => withUrqlClient(
  () => ({ url }),
)(component);