
import { initUrqlClient, SSRData } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
// import { executeExchange } from '@urql/exchange-execute';

import { Post } from './model/BlogPost';
import { CV } from './model/CVModel';
import { Entries } from './model/Includes';
import CujoQuery from './Cujo.gql';

export type CujoProps = {
    cv: CV
    blog: Entries<Post>
}

export type UrqlState = {
    props: {
        urqlState: SSRData;
    }
}

export const apiUrl = `${process.env.CUJO_SERVICE_URL}/graphql`;

export const fetchCujo = async (): Promise<UrqlState> => {
const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: "", // not needed without `fetchExchange`
      exchanges: [
        dedupExchange,
        cacheExchange,
        ssrCache,
        fetchExchange // executeExchange({ schema: CujoQuery })
      ],
    },
    false
  );

  if (!client) {
    throw new Error('Urql Client not initialised')
  }

  await client.query(CujoQuery, {}).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
  };
};