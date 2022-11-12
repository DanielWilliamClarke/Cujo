import { GetStaticProps } from 'next';
import { Portfolio } from '../src/components/App';

import { Profile } from '../src/components/profile/Profile';
import { CujoProps, fetchCujoProps, wrapPage } from '../src/Cujo';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => (
    <Portfolio cv={cv} blog={blog}>
        <Profile cv={cv} />
    </Portfolio>
));