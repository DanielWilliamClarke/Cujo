import "reflect-metadata";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "inversify-react";

import { container } from "./ioc";
import App from "./App";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

class Cujo extends Component {
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

ReactDOM.render(<Cujo />, document.getElementById("root"));
