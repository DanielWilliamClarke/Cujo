import Portfolio from '../src/components/App';

import Profile from '../src/components/profile/Profile';
import { CujoProps, CujoProvider, URQLStateProps, fetchCujo, wrapComponent } from '../src/Cujo';

export const getServerSideProps = async (): Promise<URQLStateProps> => await fetchCujo();

export default wrapComponent((): JSX.Element => (
    <CujoProvider>
        {({ cv, blog }: CujoProps) => (
            <Portfolio cv={cv} blog={blog}>
                <Profile cv={cv} />
            </Portfolio>
        )}
    </CujoProvider>
));