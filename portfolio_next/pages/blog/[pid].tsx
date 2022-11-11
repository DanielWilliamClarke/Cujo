import { Provider } from 'inversify-react';
import Portfolio from '../../app/components/App';
import { useQuery } from 'urql';
import { withUrqlClient } from 'next-urql';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import { CujoProps, UrqlState, fetchCujo, apiUrl } from '../../app/CujoFetch';
import { container } from '../../app/ioc';
import './Cujo.scss';
import CujoQuery from './Cujo.gql';
import { useRouter } from 'next/router';
import BlogPost from '../../app/components/blog/BlogPost';

export const getServerSideProps = async (): Promise<UrqlState> => await fetchCujo();

const BlogWithPid: React.FC = (): JSX.Element => {
    const router = useRouter()
    const { pid } = router.query

    const [{ data }] = useQuery<CujoProps>({ query: CujoQuery });
    if (!data) {
        throw new Error('No data returned');
    }

    const { cv, blog } = data;
    return (
        <Provider container={container}>
            <Portfolio cv={cv} blog={blog}>
                <BlogPost id={pid as string} blog={blog} />
            </Portfolio>
        </Provider>
    )
}

export default withUrqlClient(
    (ssr) => ({ url: apiUrl }),
)(BlogWithPid);