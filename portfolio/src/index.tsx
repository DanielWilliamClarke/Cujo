import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import data from "./assets/data.json";
import { CV } from "./model/CVModel";

ReactDOM.render(
  <React.StrictMode>
    <App cv={data as CV} />
  </React.StrictMode>,
  document.getElementById("root")
);
