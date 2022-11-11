
import { Provider } from 'inversify-react';
import Portfolio from '../app/components/App';
import { useQuery } from 'urql';
import { withUrqlClient } from 'next-urql';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import Profile from '../app/components/profile/Profile';
import { CujoProps, UrqlState, fetchCujo, apiUrl } from '../app/CujoFetch';
import { container } from '../app/ioc';
import './Cujo.scss';
import CujoQuery from './Cujo.gql';

export const getServerSideProps = async (): Promise<UrqlState> => await fetchCujo();

const App: React.FC = (): JSX.Element => {
    const [{ data }] = useQuery<CujoProps>({ query: CujoQuery });
    if (!data) {
        throw new Error('No data returned');
    }

    const { cv, blog } = data;
    return (
        <Provider container={container}>
            <Portfolio cv={cv} blog={blog}>
                <Profile cv={cv} />
            </Portfolio>
        </Provider>
    )
}

export default withUrqlClient(
    (ssr) => ({ url: apiUrl }),
)(App);