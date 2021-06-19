import React from "react";
import ReactDOM from "react-dom";
import axios, { AxiosResponse } from "axios";

import "./index.scss";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.min.css";

import { CV } from "./model/CVModel";

axios.get("/api/cv").then((response: AxiosResponse) => {
  ReactDOM.render(
    <React.StrictMode>
      <App cv={response.data as CV} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
