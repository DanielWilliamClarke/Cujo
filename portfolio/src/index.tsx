import "reflect-metadata";

import { Provider as IocProvider } from "inversify-react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createClient, Provider as UrqlProvider, useQuery } from 'urql';

import { BlockReverseLoading } from "./components/shared/BlockReverseLoading";
import { container } from "./ioc";
import { Post } from "./model/BlogPost";
import { CV } from "./model/CVModel";
import { Entries } from "./model/Includes";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";
import "./index.scss";

import CujoQuery from './Cujo.gql';

const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));

declare global {
  interface Window {
    prerenderReady: boolean;
  }
}

type CujoResponse = {
  cv: CV;
  blog: Entries<Post>;
};

export const Cujo: React.FC = (): JSX.Element => {
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

  window.prerenderReady = true;
  const { cv, blog } = data!
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <App cv={cv} blog={blog} />
      </Suspense>
    </Router>
  );
}

window.prerenderReady = false;

LogRocket.init("fjqkqf/cujo");
setupLogRocketReact(LogRocket);

const urqlClient = createClient({
  url: '/api/graphql',
});

ReactDOM.render(
  <React.StrictMode>
    <UrqlProvider value={urqlClient}>
      <IocProvider container={container}>
        <Cujo />
      </IocProvider>
    </UrqlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
