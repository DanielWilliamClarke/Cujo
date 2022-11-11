import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BlockReverseLoading } from "../src/components/shared/BlockReverseLoading";
import { fetchCujo, CujoProps, CujoProvider, wrapComponent, URQLStateProps } from "../src/Cujo";

const CVExport = dynamic(() => import("../src/components/cv/CVExport"), {
    ssr: false,
})

export const getServerSideProps = async (): Promise<URQLStateProps> => await fetchCujo();

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

export default wrapComponent((): JSX.Element => (
    <CujoProvider>
        {({ cv }: CujoProps) => (
            <Suspense fallback={loading}>
                <CVExport cv={cv} />
            </Suspense>
        )}
    </CujoProvider>
));