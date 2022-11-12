import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BlockReverseLoading } from "../src/components/shared/BlockReverseLoading";
import { fetchCujo, CujoProps, CujoProvider, wrapComponent, URQLStateProps } from "../src/Cujo";

const loading = (
    <BlockReverseLoading
        style={{
            height: "100vh",
            width: "auto",
        }}
        box={{
            speed: 3,
            size: 50,
        }}
    />
);

const CVExport = dynamic(() => import("../src/components/cv/CVExport"), {
    ssr: false,
    loading: () => loading
})

export const getServerSideProps = async (): Promise<URQLStateProps> => await fetchCujo();

export default wrapComponent((): JSX.Element => (
    <CujoProvider>
        {({ cv }: CujoProps) => (
            <Suspense>
                <CVExport cv={cv} />
            </Suspense>
        )}
    </CujoProvider>
));