import "reflect-metadata";

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "inversify-react";
import axios, { AxiosResponse } from "axios";

import { container } from "./ioc";
import { CV, CVState } from "./model/CVModel";
import App from "./App";

import "./index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

class Cujo extends Component<{}, CVState> {
  componentWillMount() {
    this.setState({ cv: undefined });
    axios
      .get("/api/cv")
      .then((response: AxiosResponse<CV>) =>
        this.setState({ cv: response.data })
      );
  }

  render(): JSX.Element {
    return (
      <React.StrictMode>
        <Router>
          <Provider container={container}>
            {this.state.cv && <App cv={this.state.cv} />}
          </Provider>
        </Router>
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<Cujo />, document.getElementById("root"));
