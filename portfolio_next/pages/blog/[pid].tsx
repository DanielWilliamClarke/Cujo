import Portfolio from '../../src/components/App';

import { useRouter } from 'next/router';
import BlogPost from '../../src/components/blog/BlogPost';
import { CujoProps, CujoProvider, fetchCujo, URQLStateProps, wrapComponent } from '../../src/Cujo';

export const getServerSideProps = async (): Promise<URQLStateProps> => await fetchCujo();

export default wrapComponent((): JSX.Element => {
    const { query: { pid } } = useRouter();
    return (
        <CujoProvider>
            {({ cv, blog }: CujoProps) => (
                <Portfolio cv={cv} blog={blog}>
                    <BlogPost id={pid as string} blog={blog} />
                </Portfolio>
            )}
        </CujoProvider>
    )
});