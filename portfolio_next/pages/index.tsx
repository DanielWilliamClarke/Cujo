import { GetStaticProps } from 'next';
import { Portfolio } from '../src/components/App';

import { Profile } from '../src/components/profile/Profile';
import { wrapPage } from '../src/Cujo';
import { CujoProps, fetchCujoProps } from '../src/CujoISR';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => (
    <Portfolio cv={cv} blog={blog}>
        <Profile cv={cv} />
    </Portfolio>
));