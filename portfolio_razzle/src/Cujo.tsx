import { useQuery } from 'urql';
import loadable from '@loadable/component';
import React, { Suspense } from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { BlockReverseLoading } from './components/shared/BlockReverseLoading';

import { Post } from './model/BlogPost';
import { CV } from './model/CVModel';
import { Entries } from './model/Includes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-vertical-timeline-component/style.min.css';
import './Cujo.scss';

import CujoQuery from './Cujo.gql';

const Portfolio = loadable(async () => await import(/* webpackChunkName: "Portfolio" */ './components/App'));
const CVExport = loadable(async () => await import(/* webpackChunkName: "CVExport" */ './components/cv/CVExport'));

interface CujoResponse {
  cv: CV
  blog: Entries<Post>
}

const Cujo: React.FC = (): JSX.Element => {
  const [{ data, fetching }] = useQuery<CujoResponse>({
    query: CujoQuery
  });

  if (fetching) {
    return (
      <BlockReverseLoading
        style={{
          height: '100vh',
          width: 'auto'
        }}
        box={{
          speed: 3,
          size: 50
        }}
      />
    );
  }

  // setTimeout(() => window.prerenderReady = true, 3000);
  const { cv, blog } = data!;
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
};

export default Cujo;
