import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "inversify-react";
import LogRocket from 'logrocket';

import { container } from "./ioc";
import App from "./App";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

class Cujo extends React.Component {
  render(): JSX.Element {
    return (
      <React.StrictMode>
        <Router>
          <Provider container={container}>
            <App />
          </Provider>
        </Router>
      </React.StrictMode>
    );
  }
}

LogRocket.init('fjqkqf/cujo');
ReactDOM.render(<Cujo />, document.getElementById("root"));
