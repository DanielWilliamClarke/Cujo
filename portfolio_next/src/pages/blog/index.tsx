import { Portfolio } from '@Cujo/components/App';
import { GetStaticProps } from 'next';

import { wrapPage } from '@Cujo/Cujo';
import { CujoProps, fetchCujoProps } from '@Cujo/CujoISR';

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(
  ({ cv, blog }: CujoProps): JSX.Element => <Portfolio cv={cv} blog={blog} />,
);
