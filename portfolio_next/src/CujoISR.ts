import { GetStaticProps, GetStaticPaths } from "next";
import { initUrqlClient } from "next-urql";
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from "urql";
import { CujoQuery, CujoBlogPathsQuery } from "./CujoQuery";
import { Post } from "./model/BlogPost";
import { CV } from "./model/CVModel";
import { Entries } from "./model/Includes";

export type CujoProps = {
    cv: CV
    blog: Entries<Post>
}

export type CujoBlogPaths = {
    blog: Entries<{ id: string }>
}

export const cujoServiceUrl = `${process.env.CUJO_SERVICE_URL}/graphql`

export const fetchCujoProps: GetStaticProps = async () => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(
        {
            url: cujoServiceUrl,
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
            urqlState: ssrCache.extractData(),
        },
    };
};

export const fetchCujoBlogPaths: GetStaticPaths = async () => {
    const ssrCache = ssrExchange({ isClient: false });
    const client = initUrqlClient(
        {
            url: cujoServiceUrl,
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
        fallback: 'blocking',
    }
};