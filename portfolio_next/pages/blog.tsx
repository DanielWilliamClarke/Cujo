
import Portfolio from '../src/components/App';

import { CujoProps, fetchCujo, CujoProvider, URQLStateProps, wrapComponent } from '../src/Cujo';

export const getServerSideProps = async (): Promise<URQLStateProps> => await fetchCujo();

export default wrapComponent((): JSX.Element => (
    <CujoProvider>
        {({ cv, blog }: CujoProps) => (
            <Portfolio cv={cv} blog={blog} />
        )}
    </CujoProvider>
));