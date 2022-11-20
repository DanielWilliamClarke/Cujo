import { Portfolio } from '../../src/components/App';

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { BlogPost } from '../../src/components/blog/BlogPost';
import { wrapPage } from '../../src/Cujo';
import { fetchCujoBlogPaths, fetchCujoProps, CujoProps } from '../../src/CujoISR';

export const getStaticPaths: GetStaticPaths = fetchCujoBlogPaths;
export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => {
    const { query: { pid } } = useRouter();
    return (
        <Portfolio cv={cv} blog={blog}>
            <BlogPost id={pid as string} blog={blog} />
        </Portfolio>
    );
});