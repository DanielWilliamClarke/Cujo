import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BlockReverseLoading } from "../src/components/shared/BlockReverseLoading";
import { CujoProps, wrapComponent, fetchCujoProps } from "../src/Cujo";

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

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapComponent(({ cv }: CujoProps): JSX.Element => (
    <Suspense>
        <CVExport cv={cv} />
    </Suspense>
));