/** @jsxImportSource theme-ui */

import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { BlockReverseLoading } from "../src/components/BlockReverseLoading";
import { wrapPage } from "../src/Cujo";
import { CujoProps, fetchCujoProps } from "../src/CujoISR";

const loading = (
    <BlockReverseLoading
        sx={{
            height: "100vh",
            width: "auto",
        }}
        box={{
            speed: 3,
            size: 50,
        }}
    />
);

const CVExport = dynamic(() => import("../src/components/CVExport"), {
    ssr: false,
    loading: () => loading
})

export const getStaticProps: GetStaticProps = fetchCujoProps;

export default wrapPage(({ cv }: CujoProps): JSX.Element => (
    <Suspense>
        <CVExport cv={cv} />
    </Suspense>
));