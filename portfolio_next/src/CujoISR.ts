import { Post } from '@Models/BlogPost';
import { CV } from '@Models/CVModel';
import { Entries } from '@Models/Includes';
import { GetStaticPaths, GetStaticProps } from 'next';
import { initUrqlClient } from 'next-urql';
import { cacheExchange, dedupExchange, fetchExchange, ssrExchange } from 'urql';
import { CujoBlogPathsQuery, CujoQuery } from './CujoQuery';

export type CujoProps = {
  cv: CV;
  blog: Entries<Post>;
};

export type CujoBlogPaths = {
  blog: Entries<{ id: string }>;
};

export const cujoServiceUrl = () => `${process.env.CUJO_SERVICE_URL}`;

export const fetchCujoProps: GetStaticProps = async () => {
  console.log(cujoServiceUrl());

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: cujoServiceUrl(),
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  if (!client) {
    throw new Error('Client could not be initialised');
  }

  await client.query(CujoQuery, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};

export const fetchCujoBlogPaths: GetStaticPaths = async () => {
  console.log(cujoServiceUrl());

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: cujoServiceUrl(),
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  if (!client) {
    throw new Error('Client could not be initialised');
  }

  const { data, error } = await client
    .query<CujoBlogPaths>(CujoBlogPathsQuery, {})
    .toPromise();

  if (!data || error) {
    throw error;
  }

  const { entries } = data.blog;
  return {
    paths: entries.map(({ id: pid }) => ({ params: { pid } })),
    fallback: 'blocking',
  };
};
