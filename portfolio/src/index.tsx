import "reflect-metadata";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "inversify-react";
import axios from "axios";

import { container } from "./ioc";

import "./index.scss";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-vertical-timeline-component/style.min.css";

import { CV } from "./model/CVModel";

(async () => {
  const cvData = (await axios.get("/api/cv")).data as CV;
  ReactDOM.render(
    <React.StrictMode>
      <Router>
        <Provider container={container}>
          <App cv={cvData} />
        </Provider>
      </Router>
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
