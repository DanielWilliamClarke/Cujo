import { useQuery } from 'urql';

import React, { Suspense } from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { BlockReverseLoading } from "./components/shared/BlockReverseLoading";

import { Post } from "./model/BlogPost";
import { CV } from "./model/CVModel";
import { Entries } from "./model/Includes";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";
import "./Cujo.scss";

import CujoQuery from './Cujo.gql';

const Portfolio = React.lazy(
  () => import(/* webpackChunkName: "App" */ "./components/App")
);
const CVExport = React.lazy(
  () => import(/* webpackChunkName: "CVExport" */ "./components/cv/CVExport")
);

type CujoResponse = {
  cv: CV;
  blog: Entries<Post>;
};

export const Cujo: React.FC = (): JSX.Element => {
  console.log("hey")
  const [{ data, fetching }] = useQuery<CujoResponse>({
    query: CujoQuery,
  });

  if (fetching) {
    return (
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
  }

  // setTimeout(() => window.prerenderReady = true, 3000);
  const { cv, blog } = data!
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Switch>
          <Route exact path="/cv">
            <CVExport cv={cv} />
          </Route>
          <Route exact path="/*">
            <Portfolio cv={cv} blog={blog} />
          </Route>
        </Switch>
      </Router> 
    </Suspense>
  );
}
