
import { GetStaticProps } from 'next';
import { Portfolio } from '../../src/components/App';

import { wrapPage } from '../../src/Cujo';
import { fetchCujoProps, CujoProps } from '../../src/CujoISR';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv, blog }: CujoProps): JSX.Element => (
    <Portfolio cv={cv} blog={blog} />
));