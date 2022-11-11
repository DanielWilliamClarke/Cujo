import CVExport from "../app/components/cv/CVExport";
import { withUrqlClient } from 'next-urql';
import { useQuery } from 'urql';
import { fetchCujo, CujoProps, apiUrl, UrqlState } from "../app/CujoFetch";
import CujoQuery from './Cujo.gql';

export const getServerSideProps = async (): Promise<UrqlState> => await fetchCujo();

const CV: React.FC = (): JSX.Element => {
    const [{ data }] = useQuery<CujoProps>({ query: CujoQuery });
    if (!data) {
        throw new Error('No data returned');
    }

    const { cv } = data;
    return <CVExport cv={cv} />
};

export default withUrqlClient(
    (ssr) => ({ url: apiUrl }),
)(CV);