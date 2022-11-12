
import { GetStaticProps } from 'next';
import Portfolio from '../../src/components/App';

import { CujoProps, fetchCujoProps, wrapComponent } from '../../src/Cujo';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapComponent(({ cv, blog }: CujoProps): JSX.Element => (
    <Portfolio cv={cv} blog={blog} />
));