import "reflect-metadata";

import { Provider } from "inversify-react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import { BlockReverseLoading } from "./components/shared/BlockReverseLoading";
import { container } from "./ioc";
import { Post } from "./model/BlogPost";
import { CV } from "./model/CVModel";
import { Entries } from "./model/Includes";
import { CujoService, ICujoService } from "./services/CujoService";

import "react-vertical-timeline-component/style.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";

const App = React.lazy(() => import(/* webpackChunkName: "App" */ "./App"));

declare global {
  interface Window {
    prerenderReady: boolean;
  }
}

type CujoProps = {
  service: ICujoService;
};

type CujoState = {
  cv: CV | undefined;
  blog: Entries<Post> | undefined;
};

class Cujo extends React.Component<CujoProps, CujoState> {
  constructor(props: CujoProps) {
    super(props);
    this.state = {
      cv: undefined,
      blog: undefined,
    };

    this.props.service.FetchGraphQL()
      .then(({cv, blog}) => this.setState({cv, blog}));
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.state.cv && this.state.blog) {
        window.prerenderReady = true;
      }
    }, 5000);
  }

  render(): JSX.Element {
    if (!this.state.cv) {
      return this.displayLoading();
    }

    return (
      <React.StrictMode>
        <Router>
          <Provider container={container}>
            <Suspense fallback={<div>Loading...</div>}>
              <App cv={this.state.cv!} blog={this.state.blog} />
            </Suspense>
          </Provider>
        </Router>
      </React.StrictMode>
    );
  }

  private displayLoading(): JSX.Element {
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
}

window.prerenderReady = false;

LogRocket.init("fjqkqf/cujo");
setupLogRocketReact(LogRocket);

ReactDOM.render(
  <Cujo service={new CujoService()} />,
  document.getElementById("root")
);
